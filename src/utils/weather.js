const request = require('request');

const darkSykURL = 'https://api.darksky.net/forecast/3b3936586b9e32fd59f56451ca9a0a01/';
const darkSkyURLParams = '?units=si';

getWeather = ({ latitude, longitude, place }, callback) => {
    request.get(`${darkSykURL}${latitude},${longitude}${darkSkyURLParams}`, { json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service.', undefined);
        }
        else if (body.code === 400) {
            callback('Can\'t find location.', undefined);
        } else {
            const currentData = body.currently;
            callback(undefined, { place, forecast: body.daily.data[0].summary, temperature: currentData.temperature, rainPercentage: currentData.precipProbability * 100, formattedReport: `${place ? ('Weather at ' + place + ' is ') : ''}${body.daily.data[0].summary} It is currently ${currentData.temperature} degree out. There is ${currentData.precipProbability * 100} % chance of rain today.` });
        }
    });
}

module.exports = {
    getWeather
};
