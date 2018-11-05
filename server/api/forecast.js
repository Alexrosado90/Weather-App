let express = require('express');
let forecast = require('../models/forecast');

let router = express.Router();

router.get('/:city', function (req,res) {
  let city = req.params.city;

  forecast.retrieveForecast(city, function (err, forecast) {
      if (err)
      return res.json(err);
      return res.json(forecast);
  });
});

module.exports = router;