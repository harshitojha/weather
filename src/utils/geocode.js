const request = require("request");
const geocode = (address, callback) => {
  const url2 =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaGFyc2hpdG9qaGEiLCJhIjoiY2thOXBva2NnMHZmbDJzb3piNWFzbXg2dCJ9.GgjhHJdGT4dTydYy0vvIpw&limit=1";
  request({ url: url2, json: true }, (error, res) => {
    if (error) {
      callback(error, undefined);

      console.log("unable to connect to geocoding service");
    } else if (res.body.features.length === 0) {
      callback(
        "parameters do not fulfill the query for geocoding service",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: res.body.features[0].center[1],
        longitude: res.body.features[0].center[0],
        location: res.body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
