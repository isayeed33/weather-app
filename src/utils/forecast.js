const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=db58819157b4c4aecb95e9ec55e5a2a6&query='+latitude+','+longitude+'&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'The climate is '+body.current.weather_descriptions[0]+' with the temperature of '+body.current.temperature+' degrees. WindSpeed: '+body.current.wind_speed)
            console.log(body.current)
        }
    })
}

module.exports = forecast
