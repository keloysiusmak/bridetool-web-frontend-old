const axios = require('axios');
const handler = require('../handlers/handler');
const tokenHandler = require('../handlers/tokenHandler');

function getSchedule(tokens, scheduleId) {
  return axios.get(axios.defaults.scheduleUrl + '/schedule/' + scheduleId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function updateSchedule(tokens, scheduleId, fields) {
  return axios.put(axios.defaults.scheduleUrl + '/schedule/' + scheduleId, fields, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function deleteSchedule(tokens, scheduleId) {
  return axios.delete(axios.defaults.scheduleUrl + '/schedule/' + scheduleId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function restoreSchedule(tokens, scheduleId) {
  return axios.post(axios.defaults.scheduleUrl + '/schedule/' + scheduleId + '/restore', {}, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
module.exports = {
  getSchedule,
  updateSchedule,
  deleteSchedule,
  restoreSchedule
};
