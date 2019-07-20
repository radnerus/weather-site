const request = require('request');

const mapBoxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/<ADDRESS>.json?access_token=pk.eyJ1IjoicmFkbmVydXMiLCJhIjoiY2p5YjY0em1iMDVnMzNicGcwMGFreTRhNiJ9.KvfS5thNKyShduZ-G7HI-w&limit=1';

const getGeoCode = (address, callback) => {
    request.get(mapBoxURL.replace('<ADDRESS>', encodeURIComponent(address)), { json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to map service.', undefined);
        } else if (!body.features.length) {
            callback('Unable to find the required location', undefined);
        } else {
            const coordinates = body.features[0].center;
            const place = body.features[0].place_name;
            const latitude = coordinates[1];
            const longitude = coordinates[0];
            callback(undefined, { latitude, longitude, place });
        }
    });
}

module.exports = {
    getGeoCode
};
