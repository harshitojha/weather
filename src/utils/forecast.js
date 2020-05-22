//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6e9cc631aba8c98deaa2fee3bd0263d5&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    ",&units=";

  request({ url: url, json: true }, (e, res) => {
    if (e) {
      callback("unable to connect to weather service", undefined);
    } else if (res.body.error) {
      callback("parameters do not fulfill for weather service", undefined);
    } else {
      // callback(undefined, {
      //   current: res.body.current.temperature,
      //   feelsLike: res.body.current.feelslike,
      // });
      callback(
        undefined,
        res.body.current.weather_descriptions[0] +
          " It is currently " +
          res.body.current.temperature +
          " degress out. There is a " +
          res.body.current.precip +
          "% chance of rain."
      );
    }
  });
};
// forecast(-75.7088, 44.1545, (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });

module.exports = forecast;
