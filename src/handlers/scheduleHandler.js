const axios = require('axios');
const handler = require('../handlers/handler');
const tokenHandler = require('../handlers/tokenHandler');

function getSchedules(tokens, customerId) {
  return axios.get('/customer/' + customerId + '/schedules', {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}

function getSchedule(tokens, scheduleId) {
  return axios.get('/schedule/' + scheduleId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
function updateSchedule(tokens, scheduleId, fields) {
  return axios.put('/schedule/' + scheduleId, fields, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
function addSchedule(tokens, customerId, fields) {
  return axios.post('/customer/' + customerId + '/schedules', fields, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
function removeSchedule(tokens, scheduleId) {
  return axios.delete('/schedule/' + scheduleId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
function restoreSchedule(tokens, scheduleId) {
  return axios.post('/schedule/' + scheduleId + '/restore', {}, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
module.exports = {
  getSchedules,
  getSchedule,
  updateSchedule,
  addSchedule,
  removeSchedule,
  restoreSchedule
};
