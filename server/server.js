const express = require('express')
const WebSocket = require('ws')
const generator = require('./model/generate.js')
const { alert } = require('./model/model.js')
const { partition, findLast } = require('./util/utils.js')

const web_service_port = 8080
const web_socket_port = 8090

const app = express()
app.use(express.json())
app.use(function(_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, User-Agent");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH");
    next();
});
app.use(express.static('static'))

const wss = new WebSocket.Server({ port: web_socket_port, path: '/warnings' })

let alert_id = 1
const create_alerts = predictions => {
    const alerts = predictions.filter(generator.alertable).map((prediction, i) => alert(alert_id + i, 3, prediction))
    alert_id += alerts.length
    return alerts
}
  
const start_time = new Date()
const data = generator.generate_historic_data(start_time)
let forecast = generator.generate_forecast(start_time)
const alerts = create_alerts(forecast)
let historic_alerts = { [ start_time.getTime() ]: alerts.slice() }

const update_alerts = (forecast, time) => {
    const match_alerts = alerts.map((alert, idx) => ({ idx, new_prediction: forecast.find(alert.matches)}))
    const { positive: updated_alerts, negative: cancelled_alerts } = partition(t => t.new_prediction && generator.alertable(t.new_prediction))(match_alerts)
    const unalerted = forecast.filter(p => !alerts.some(a => a.matches(p)))

    cancelled_alerts.forEach(({idx}) => alerts[idx] = alerts[idx].cancelled())
    updated_alerts.forEach(({idx, new_prediction}) => alerts[idx] = alerts[idx].updated(new_prediction))
    alerts.push(...create_alerts(unalerted))

    historic_alerts[time.getTime()] = alerts.slice()
}

const regenerate_forecast = () => {
    const time = new Date()
    const new_forecast = generator.regenerate_forecast(forecast)(time)
    update_alerts(new_forecast, time)
    return forecast = new_forecast
}

const warnings = alerts => ({ time: new Date(), warnings: alerts })

app.get('/data', (_, res) => {
    res.send(data)
})

app.get('/data/:place', (req, res) => {
    res.send(data.filter(({place}) => place === req.params.place))
})

app.post('/data', (req, res) => {
    const new_data = [].concat(req.body)
    data.push(...new_data)
    res.status(201)
    res.send(new_data)
})

app.get('/forecast', (_, res) => {
    res.send(forecast)
})

app.get('/forecast/:place', (req, res) => {
    res.send(forecast.filter(({place}) => place === req.params.place))
})

app.get('/warnings', (_, res) => {
    res.send(warnings(alerts.filter(a => a.prediction)))
})

app.get('/warnings/:id', (req, res) => {
    const alert = alerts.find(({id}) => id == req.params.id)
    if (alert)
        res.send(alert)
    else {
        res.status(404)
        res.send()
    }
})

app.get('/warnings/since/:time', (req, res) => {
    const time = Date.parse(req.params.time)
    if (time) {
        const alert_time = findLast(t => t <= time)(Object.keys(historic_alerts))
        if (alert_time) {
            const old_alerts = historic_alerts[alert_time]
            res.send(warnings(alerts.filter(a => !old_alerts.some(a.equals))))
        } else {
            res.send(warnings(alerts.filter(a => a.prediction)))
        }
    } else {
        res.status(400)
        res.send()
    }
})

const update_frequency_seconds = process.argv[2] || 600

function update_periodically() {
    setTimeout(() => {
        regenerate_forecast()
        update_periodically()
        const all_alerts = Object.values(historic_alerts)
        const old_alerts = all_alerts[all_alerts.length - 2]
        if (old_alerts) {
            alerts
                .filter(a => !old_alerts.some(a.equals))
                .forEach(alert => 
                    [...wss.clients]
                        .filter(client => client.readyState === WebSocket.OPEN && client.subscribed)
                        .forEach( client => client.send(JSON.stringify(alert)) )
                )
        }
    }, update_frequency_seconds * 1000)
}

update_periodically()

wss.on('connection', (ws, req) => {
    ws.on('message', message => {
        switch(message.toString()) {
            case 'subscribe':
                if (!ws.subscribed) {
                    ws.subscribed = true
                    ws.send(JSON.stringify(warnings(alerts)))
                }
                break;
            case 'unsubscribe':
                ws.subscribed = false
                break;
            default:
                console.error(`Incorrect message: '${message}' from ${req.socket.remoteAddress} (${req.socket.remoteFamily})`)
        }
    })
    ws.on('close', () => ws.subscribed = false)
})

app.listen(web_service_port, () => console.log("Server started on", web_service_port, "at", start_time.toString()))