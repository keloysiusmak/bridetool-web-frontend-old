const axios = require('axios');
const config = require('../../config/config.' + process.env.NODE_ENV);
const handler = require('../handlers/handler');

function getCustomerSchedules(accessToken) {
  return axios.get('/customer/schedules', {
    headers: {
      'access-token': accessToken
    }
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
module.exports = {
  getCustomerSchedules
}
