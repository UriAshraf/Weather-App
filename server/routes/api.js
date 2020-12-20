const express = require('express')
const axios = require('axios').default
const router = express.Router()
const City = require('../model/city')
const env = require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/weatherDB', {useNewUrlParser: true, useUnifiedTopology:true})

const apiKey = process.env.WEAHTER_API_KEY


router.get('/', (req, res) => {
    res.send('Route works')
})


//makes external api rqst and send back relavet data of city
router.get('/city/:cityName', async function(req, res){
    const city = req.params.cityName
    try {
        let info = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        weather = info.data
        const cityWeather = {
            name: weather.name,
            temp: Math.round(weather.main.temp),
            condition: weather.weather[0].main,
            conditionPic: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        }
        console.log(cityWeather);
        res.send(cityWeather)
    }catch(err){
        res.send(err.message)
    }
})



//find all city data from db and send to client 
router.get('/cities', async (req, res) => {
    try {
        const cities = await City.find({})
        res.send(cities)
    } catch (err) {
        console.log(err.message)
        res.send(err.message)
    }
})



router.post('/city', async function(req, res){
    const city = new City (req.body )
    await city.save()
    res.send(city)
})



router.delete('/city/:cityName', async function (req, res) {
    const name = req.params.cityName
    await City.findOneAndDelete({ name: name })
    res.end()
})



module.exports = router