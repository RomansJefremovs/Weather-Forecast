const equals = (...keys) => x => y => [].concat(...keys).every(k => (x[k] === null && y[k] === null) || (x[k].equals && x[k].equals(y[k]) || x[k] === y[k]))

const with_equals = (...keys) => o => Object.assign({}, o, {equals: equals(...keys)(o)})

const data_type = (type, unit) => properties => Object.assign({}, properties, {type, unit})

const event = (time, place) => properties => Object.assign({}, properties, {time, place})

const measurement = data_type => (object, event) => Object.assign(Object.create({event: () => event}), event(data_type(object)))

const temperature_measurement = measurement(data_type('temperature', 'C'))
const precipitation_measurement = measurement(data_type('precipitation', 'mm'))
const wind_measurement = measurement(data_type('wind speed', 'm/s'))
const cloud_measurement = measurement(data_type('cloud coverage', '%'))

const prediction_keys = ['time', 'place', 'type', 'unit', 'from', 'to']
const prediction_equals = with_equals(prediction_keys)

const temperature = (value, event) => temperature_measurement({value}, event)
const temperature_prediction = ({from, to}, event) => prediction_equals(temperature_measurement({from, to}, event))

const wind = (value, direction, event) => wind_measurement({value, direction}, event)
const wind_prediction = ({from, to}, directions, event) => with_equals(prediction_keys.concat('directions'))(wind_measurement({from, to, directions}, event))

const precipitation = (value, precipitation_type, event) => precipitation_measurement({value, precipitation_type}, event)
const precipitation_prediction = ({from, to}, precipitation_types, event) => with_equals(prediction_keys.concat('precipitation_types'))(precipitation_measurement({from, to, precipitation_types}, event))

const cloud = (value, event) => cloud_measurement({value}, event)
const cloud_prediction = ({from, to}, event) => prediction_equals(cloud_measurement({from, to}, event))

const alert = (id, severity, prediction) => {
    const create_alert = (id, severity, prediction) => {
        const matches = other_prediction => { 
        return prediction && other_prediction && other_prediction.time && other_prediction.place && other_prediction.type &&
                prediction.time.getTime() === other_prediction.time.getTime() && 
                prediction.place === other_prediction.place && 
                prediction.type === other_prediction.type
        }
        const cancelled = () => create_alert(id, 0, null)
        const updated = other_prediction => {
            if (matches(other_prediction)) {
                if (other_prediction.to > prediction.to)
                    return create_alert(id, severity + 1, other_prediction)
                else if (other_prediction.to < prediction.to && severity > 1)
                    return create_alert(id, severity - 1, other_prediction)
            }
            return create_alert(id, severity, prediction)
        }
        return with_equals('id', 'severity', 'prediction')({ id, severity, prediction, matches, cancelled, updated })
    }
    if (id < 1 || severity < 1 || !prediction || !prediction.time || !prediction.place || !prediction.type) throw 'Illegal parameters'
    return create_alert(id, severity, prediction)
}

module.exports = {event, temperature, temperature_prediction, wind, wind_prediction, precipitation, precipitation_prediction, cloud, cloud_prediction, alert}
