const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};
/* 
 * Makes a request to ipvigilante.com using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const data = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${data}`)
};

const fetchISSFlyOverTimes = (coords) => {
  const {lat,lon} = JSON.parse(coords)
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`)
};

const nextISSTimesForMyLocation = ()=> {
 return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((passtimes) => {
    let {response} = JSON.parse(passtimes)
    return {response}
  });         
} 

module.exports = {nextISSTimesForMyLocation};
