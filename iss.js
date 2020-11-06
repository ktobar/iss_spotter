const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  let ipURL = 'https://geo.ipify.org/api/v1?apiKey=at_a2kY2VIKdSJQVesNfX6rNu9nJCIrw&ipAddress';

  request(ipURL, (error, response, body)=> {
    
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);

    if (data.length === 0) {
      callback(Error('No Data Found'), null);
      return;
    }

   callback(error, data.ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  let ipCord = 'http://ip-api.com/json/';
  request(ipCord+ip, (error, response, body)=> {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);

    if (data.length === 0) {
      callback(Error('No Data Found'), null);
      return;
    }
    let cord = { 
      latitude: data.lat, 
      longitude: data.lon }

    callback(error, cord);
  });
}

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  let urlISS = 'http://api.open-notify.org/iss-pass.json?lat='+coords.latitude+'&'+'lon='+coords.longitude
  
  request(urlISS, (error, response, body)=> {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS time. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const pass = JSON.parse(body).response;

    if (pass.length === 0) {
      callback(Error('No Data Found'), null);
      return;
    }
    callback(error, pass);
  });
};

module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};