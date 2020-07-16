const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000


const viewPAth = path.join(__dirname,'../templates/views')

const patrialsPAth = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPAth)

hbs.registerPartials(patrialsPAth)

//static directory
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Walter'
    })
})
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'Weather 2',
        name: 'Poopy'
    })

})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        help_message: 'Here is some help',
        name: 'Walter'
    })

})

// app.use(express.static(path.join(__dirname,'../public/help.html')))
// app.use(express.static(path.join(__dirname,'../public/about.html')))

// app.get('', (req,res) => {
// res.send('Hello express!')
// })

// app.get('/help', (req,res) => {
//     res.send('Help page')
// })

// app.get('/about', (req,res) => {
//     res.send('<H1>About</H1>')
// })

app.get('/weather', (req,res) => {
    
    if (!req.query.address) {
        res.send({
            error: 'You must search for a city'
        })

    }
    else {

    geocode(req.query.address,(error, {latitude,longitude,location}={}) => {

        if (error) {
            console.log(error)
         return   res.send({error})
        }
        else {
        forecast(latitude,longitude,(error,fdata) => {
            res.send({
                location,
                forecast: fdata,
                address: req.query.address
            })
        })
        }
    })
}
})


app.get('/products',(req,res) => {
    console.log(req.query)
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    }
    else {
    
    console.log(req.query)
    res.send( {
        products: []
    })
    }
})

app.get('/help/*',(req,res) => {
    res.render('404', {
        title: '404 Error',
        error: 'Help file not found',
        name: 'Poopy'
    })
})


app.get('*',(req,res) => {
    res.render('404', {
        title: '404 Error',
        error: 'File not found',
        name: 'Walter'
    })
})
// app.com
// app.com/help
// app.com/about

app.listen(PORT, () => {
console.log('Server is up on port ' + PORT)
})

