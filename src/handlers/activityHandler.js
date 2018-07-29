const axios = require('axios');
const handler = require('../handlers/handler');

function getActivity(accessToken, activityId) {
  return axios.get('/activity/' + activityId, {
    headers: {
      'access-token': accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
function updateActivity(accessToken, activityId, fields) {
  return axios.put('/activity/' + activityId, fields, {
    headers: {
      'access-token': accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
module.exports = {
  getActivity,
  updateActivity
};
