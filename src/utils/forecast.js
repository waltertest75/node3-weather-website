const request = require('request')

const forecast = (long,lat,callback) => {

 //   'http://api.weatherstack.com/current?access_key=b4ae7d3d50e9440caafac97386f659cb&query=37.8267,-122.4233&units=f'

  const url =  'http://api.weatherstack.com/current?access_key=b4ae7d3d50e9440caafac97386f659cb&query='  + lat + ',' + long + '&units=f'

    request ({url,json: true},(error,{body}) => {

       // const {weather_descriptions,temperature,feelslike} = response.body.current
       // const {success} = response.body
        if (error) {
            callback('Unable to conecct to location services')
        } else if (body.error) {
            callback('Unable to find location. Try another search')
        } else {
          //  callback(undefined, response.body.current.weather_descriptions[0] + " It is currently "+ response.body.current.temperature + " and it feels like "+ response.body.current.feelslike)
            callback(undefined, body.current.weather_descriptions[0] + " It is currently "+ body.current.temperature + " and it feels like "+ body.current.feelslike)
    }
})
}

module.exports = forecast