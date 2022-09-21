const {pipe, flatMap, range} = require('./utils.js')

const ms_per_hour = 60 * 60 * 1000
const ms_per_day = 24 * ms_per_hour
const days_per_week = 7

const beginning_of_day = date => new Date(date.getFullYear(), date.getMonth(), date.getDate())
const beginning_of_hour = date => new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours())
const days_later = days => date => new Date(date.getTime() + days * ms_per_day)
const week_before = days_later(-days_per_week)
const next_day = days_later(1)
const hours_after = date => hours => new Date(date.getTime() + hours * ms_per_hour)
const next_24_hours = date => range(24).map(hours_after(date))
const latest_week = date => range(7).map(d => days_later(d)(week_before(beginning_of_day(date))))
const hours_in_latest_week = pipe(latest_week, flatMap(next_24_hours))

module.exports = {
    ms_per_hour,
    ms_per_day,
    days_per_week,
    beginning_of_day,
    beginning_of_hour,
    days_later,
    week_before,
    next_day,
    hours_after,
    next_24_hours,
    latest_week,
    hours_in_latest_week,
}