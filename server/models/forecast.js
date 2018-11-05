const request = require('request-promise');

const API_KEY = '24df04da3977b33c8bbd2dde96bf785e'

class forecast {

    static retrieveForecast (city, callback) {
        request({
            uri:`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}&units=imperial`,
            json: true
        }).then(function (res) {
            callback(res);
        }).catch(function (err) {
            console.log(err);
            callback({ error: 'Could not reach OpenWeatherMap API.'})
        });
    }
}

module.exports = forecast;