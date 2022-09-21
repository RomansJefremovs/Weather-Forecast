const { pipe, flatMap } = require('../util/utils.js')
const { beginning_of_day, beginning_of_hour, hours_after, next_24_hours, hours_in_latest_week } = require('../util/dates.js')

const model = require('./model.js')

const round_to = decimals => number => Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals)
const random_number = ({min, max}) => round_to(1)(Math.random() * (max - min) + min)
const random_interval = ({min, max, width}) => {
    const from = random_number({min, max: max - width})
    const to = round_to(1)(from + random_number({min: 1, max: width}))
    return {from, to}
}
const random_index = elements => Math.floor(Math.random() * elements.length)
const random_element = elements => elements[random_index(elements)]
const random_subset = elements => elements.filter(_ => Math.random() < .5)
const random_section = elements => {
    const offset = random_index(elements)
    const length = random_index(elements) + 1
    return elements.concat(elements).slice(offset, offset + length)
}

const places = ['Horsens', 'Aarhus', 'Copenhagen']
const temperatures = { min: -10, max: 30, width: 5 }
const precipitations = { min: 0, max: 20, width: 10 }
const precipitation_types = ['rain', 'sleet', 'hail', 'snow']
const wind_speeds = { min: 0, max: 40, width: 10 }
const wind_directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest']
const coverages = { min: 0, max: 100, width: 50 }

const generate_data = event => [
    model.temperature(random_number(temperatures), event),
    model.precipitation(random_number(precipitations), random_element(precipitation_types), event),
    model.wind(random_number(wind_speeds), random_element(wind_directions), event),
    model.cloud(random_number(coverages), event)
]

const generate_predictions = event => [
    model.temperature_prediction(random_interval(temperatures), event),
    model.precipitation_prediction(random_interval(precipitations), random_subset(precipitation_types), event),
    model.wind_prediction(random_interval(wind_speeds), random_section(wind_directions), event),
    model.cloud_prediction(random_interval(coverages), event)
]

const alertable = ({ type, to }) => (type === 'precipitation' && to >= 17) || (type === 'wind speed' && to >= 36)

const generate_historic_times = date => hours_in_latest_week(beginning_of_day(date))
const generate_historic_events = pipe(generate_historic_times, flatMap(time => places.map(place => model.event(time, place))))
const generate_historic_data = pipe(generate_historic_events, flatMap(generate_data))

const generate_future_times = date => next_24_hours(hours_after(beginning_of_hour(date))(1))
const generate_future_events = pipe(generate_future_times, flatMap(time => places.map(place => model.event(time, place))))
const generate_forecast = pipe(generate_future_events, flatMap(generate_predictions))
const regenerate_forecast = forecast => pipe(generate_future_events, flatMap( event => {
    const { time, place } = event({})
    const existing_predictions = forecast.filter(p => p.time.getTime() === time.getTime() && p.place === place)
    const new_predictions = generate_predictions(event)
    if (existing_predictions.length === 0)
        return new_predictions
    else
        return existing_predictions.map ( p => {
            const adjustment = .8 + Math.random() * .4
            if (alertable(p) && Math.random() < 0.5)
                return Object.assign({}, p, { from: round_to(1)(p.from * adjustment), to: round_to(1)(p.to * adjustment) })
            else if (Math.random() < .5)
                return new_predictions.find( np => p.type === np.type)
            else
                return p
        })
    
    //(existing_predictions.length && Math.random() < .75) ? existing_predictions : generate_predictions(event)
}))

module.exports = { generate_historic_data, generate_forecast, regenerate_forecast, alertable }
