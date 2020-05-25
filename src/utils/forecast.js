const request = require('request')

function forecast(locationKey, callBack) {
    const url = 'https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/' + encodeURIComponent(locationKey) + '?apikey=YB0E4GxXuGreGdJlJR86G5x6VAxht4gE&details=true&metric=true'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callBack('Something went wrong. Please check your connection.', undefined)
        } else if (body.code === '400') {
            callBack('Invalid location', undefined)
        } else {
            callBack(undefined, {
                currentTemperature: body[0].Temperature.Value,
                wind: body[0].Wind.Speed.Value,
                rain: body[0].RainProbability
            })
        }
    })
}

module.exports = forecast