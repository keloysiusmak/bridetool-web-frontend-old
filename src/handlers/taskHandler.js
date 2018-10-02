const axios = require('axios');
const handler = require('../handlers/handler');
const tokenHandler = require('../handlers/tokenHandler');

function addTask(tokens, activityId, fields) {
  return axios.post(axios.defaults.activityUrl + '/activity/' + activityId + '/task', fields, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}

function deleteTask(tokens, taskId) {
  return axios.delete(axios.defaults.taskUrl + '/task/' + taskId, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}

function markTask(tokens, taskId, fields) {
  return axios.put(axios.defaults.taskUrl + '/task/' + taskId, fields, {
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
  addTask,
  deleteTask,
  markTask
};
