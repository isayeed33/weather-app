const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define path for express
const publicDirectoyPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoyPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Irfan Sayeed',
        footermsg: 'Created by '
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Irfan Sayeed',
        footermsg: 'Created by '
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help message!',
        name: 'Irfan Sayeed',
        footermsg: 'Created by '
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}) => {
            if(error){
                return res.send({error})
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
    })

    // res.send({
    //     forecast: 'forecast',
    //     location: 'location',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        error: '404 Error!'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})