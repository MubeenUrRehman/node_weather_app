const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


//  Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views/')
const partialsPath = path.join(__dirname, '../templates/partials/')

//  Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//  Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        message: 'See forecast',
        name: 'Mubeen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mubeen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help page.',
        name: 'Mubeen'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Mubeen',
        message: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }

    geoCode(req.query.address, (error, { locationKey, location } = {}) => {
        console.log(error)
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(locationKey, (error, { currentTemperature, rain } = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location: location,
                temperature: currentTemperature,
                rain: rain
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Mubeen',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server has started on port: ' + port)
})