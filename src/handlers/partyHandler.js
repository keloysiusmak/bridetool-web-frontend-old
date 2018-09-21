const axios = require('axios');
const handler = require('../handlers/handler');
const tokenHandler = require('../handlers/tokenHandler');

function getParty(tokens, partyId) {
  return axios.get(axios.defaults.partyUrl + '/party/' + partyId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function addParty(tokens, coupleId, fields) {
  return axios.post(axios.defaults.partyUrl + '/couple/' + coupleId + '/party', fields, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function updateParty(tokens, partyId, fields) {
  return axios.put(axios.defaults.partyUrl + '/party/' + partyId, fields, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function deleteParty(tokens, partyId) {
  return axios.delete(axios.defaults.partyUrl + '/party/' + partyId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function restoreParty(tokens, partyId) {
  return axios.post(axios.defaults.partyUrl + '/party/' + partyId + '/restore', {}, {
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
  getParty,
  addParty,
  updateParty,
  deleteParty,
  restoreParty
};
