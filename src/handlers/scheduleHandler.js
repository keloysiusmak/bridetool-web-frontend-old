const axios = require('axios');
const handler = require('../handlers/handler');
const tokenHandler = require('../handlers/tokenHandler');

function getSchedule(tokens, scheduleId) {
  return axios.get('/schedule/' + scheduleId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function updateSchedule(tokens, scheduleId, fields) {
  return axios.put('/schedule/' + scheduleId, fields, {
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
  return axios.delete('/schedule/' + scheduleId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function restoreSchedule(tokens, scheduleId) {
  return axios.post('/schedule/' + scheduleId + '/restore', {}, {
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
