export const sharedData = (place, type, unit, time) => {
    const getPlace = () => place
    const getType = () => type
    const getUnit = () => unit
    const getTime = () => time
    return { getPlace, getType, getUnit, getTime }
}

export const forecastData = ({data, from, to, place, type, unit, time, precipitation_types, directions}) => {
    if(data === undefined) data = sharedData(place, type, unit, time)
    const getPrecipitationTypes = () => precipitation_types
    const getDirections = () => directions
    const getFrom = () => from
    const getTo = () => to
    return { getFrom, getTo, getPrecipitationTypes, getDirections, data}
}

export const historicalData = ({data, value, type, unit, time, place, direction, precipitation_type}) => {
    if(data === undefined) data = sharedData(place, type, unit, time)
    const getValue = () => value
    const getDirection = () => direction
    const getPrecipitationType = () => precipitation_type
    return { getValue, data, getDirection, getPrecipitationType}
}