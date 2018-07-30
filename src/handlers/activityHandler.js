const axios = require('axios');
const handler = require('../handlers/handler');

function getActivity(tokens, activityId) {
  return axios.get('/activity/' + activityId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
function updateActivity(tokens, activityId, fields) {
  return axios.put('/activity/' + activityId, fields, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
function removeActivity(tokens, activityId) {
  return axios.delete('/activity/' + activityId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
function restoreActivity(tokens, activityId) {
  return axios.post('/activity/' + activityId + '/restore', {}, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
module.exports = {
  getActivity,
  updateActivity,
  removeActivity,
  restoreActivity
};
