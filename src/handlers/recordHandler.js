const axios = require('axios');
const handler = require('../handlers/handler');

function getRecord(tokens, recordId) {
  return axios.get(axios.defaults.recordUrl + '/record/' + recordId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function deleteRecord(tokens, recordId) {
  return axios.delete(axios.defaults.recordUrl + '/record/' + recordId, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function updateRecord(tokens, recordId, fields) {
  return axios.put(axios.defaults.recordUrl + '/record/' + recordId, fields, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function insertRecord(tokens, budgetId, fields) {
  return axios.post(axios.defaults.recordUrl + '/budget/' + budgetId + '/record', fields, {
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
  getRecord,
  insertRecord,
  updateRecord,
  deleteRecord
};
