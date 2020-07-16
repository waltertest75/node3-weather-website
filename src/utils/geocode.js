const request = require('request')


const geocode = (address,callback) =>{
const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoid2RoZWRyaWNrIiwiYSI6ImNrYnprb25kYjA5MXEyd24wdDhjZTlhM3YifQ.hz-oc8La3OB1EZ3ROw9aQw&limit=1'
request({url, json: true}, (error, {body}) => {
     
    
    
    if (error) {
        callback('Unable to conecct to location services')
    } else if (body.features.length ===0) {
        callback('Unable to find location. Try another search')
    } else {
        //const {center, place_name} = response.body.features[0]
        callback(undefined, {
            latitude: body.features[0].center[0],
            longitude: body.features[0].center[1],
            location: body.features[0].place_name

            // latitude: response.body.features[0].center[0],
            // longitude: response.body.features[0].center[1],
            // location: response.body.features[0].place_name
        })
    }
})
}



module.exports = geocode