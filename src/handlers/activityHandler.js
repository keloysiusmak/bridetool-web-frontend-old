const axios = require('axios');
const handler = require('../handlers/handler');

function getActivity(tokens, activityId) {
  return axios.get(axios.defaults.activityUrl + '/activity/' + activityId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function addActivity(tokens, scheduleId, fields) {
  return axios.post(axios.defaults.activityUrl + '/schedule/' + scheduleId + '/activity', fields, {
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
  return axios.put(axios.defaults.activityUrl + '/activity/' + activityId, fields, {
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
  return axios.delete(axios.defaults.activityUrl + '/activity/' + activityId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function restoreActivity(tokens, activityId) {
  return axios.post(axios.defaults.activityUrl + '/activity/' + activityId + '/restore', {}, {
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
