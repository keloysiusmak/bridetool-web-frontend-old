const axios = require('axios');
const handler = require('../handlers/handler');

function getActivity(tokens, activityId) {
  return axios.get('/activity/' + activityId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function addActivity(tokens, scheduleId, fields) {
  return axios.post('/schedule/' + scheduleId + '/activity', fields, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function updateActivity(tokens, activityId, fields) {
  return axios.put('/activity/' + activityId, fields, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function deleteActivity(tokens, activityId) {
  return axios.delete('/activity/' + activityId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function restoreActivity(tokens, activityId) {
  return axios.post('/activity/' + activityId + '/restore', {}, {
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
  getActivity,
  addActivity,
  updateActivity,
  deleteActivity,
  restoreActivity
};
