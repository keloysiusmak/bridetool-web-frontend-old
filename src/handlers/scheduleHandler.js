const axios = require('axios');
const handler = require('../handlers/handler');

function getCustomerSchedules(accessToken, customerId) {
  return axios.get('/customer/' + customerId + '/schedules', {
    headers: {
      'access-token': accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}

function getDeletedCustomerSchedules(accessToken, customerId) {
  return axios.get('/customer/' + customerId + '/schedules/deleted', {
    headers: {
      'access-token': accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}

function getSchedule(accessToken, scheduleId) {
  return axios.get('/schedule/' + scheduleId, {
    headers: {
      'access-token': accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
module.exports = {
  getCustomerSchedules,
  getDeletedCustomerSchedules,
  getSchedule
};
