const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const PUBLIC_FOLDER = path.join(__dirname, '../public');
const VIEW_PATH = path.join(__dirname, '../templates/views');
const PARTIALS_PATH = path.join(__dirname, '../templates/partials');

const app = express();
const port = process.env.PORT || 8080 ;

app.set('view engine', 'hbs');
app.set('views', VIEW_PATH);
hbs.registerPartials(PARTIALS_PATH);

app.use(express.static(PUBLIC_FOLDER));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Surendar V'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Help text.'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        imageURL: 'images/profile.jpg',
        title: 'About Me',
        name: 'Surendar V'
    })
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (address) {
        geocode.getGeoCode(address, (error, coordinates) => {
            if (error) return res.status(500).send({ error });
            weather.getWeather(coordinates, (errorWeather, weather) => {
                if (errorWeather) {
                    res.status(500).send({ error: errorWeather });
                }
                res.send({ weather });
            });
        });
    } else {
        return res.status(500).send({
            error: 'You must provide an address.'
        });
    }
});

app.get('/products', (req, res) => {
    const query = req.query;
    if (query.search) {
        return res.send({
            products: []
        });
    } else {
        return res.status(500).send({
            error: 'You must provide a search term'
        });
    }
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        content: 'Help content not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        content: 'Page not found'
    });
});

app.listen(port, () => {
    console.log(`Server is up at ${port}`);
});
