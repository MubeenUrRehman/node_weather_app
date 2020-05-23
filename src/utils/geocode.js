const request = require('request')

//  GETTING THE LOCATION ID
function geoCode(address, callBack) {
    const url = 'http://dataservice.accuweather.com/locations/v1/search?q=' + encodeURIComponent(address) + '&apikey=YB0E4GxXuGreGdJlJR86G5x6VAxht4gE'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callBack('Something went wrong. Please check your connection.', undefined)
        } else if (body.length === 0) {
            callBack('Please enter a valid location.', undefined)
        } else {
            callBack(undefined, {
                locationKey: body[0].Key,
                location: `${body[0].LocalizedName}, ${body[0].AdministrativeArea.LocalizedName}, ${body[0].Country.LocalizedName}`
            })
        }
    })
}

module.exports = geoCode