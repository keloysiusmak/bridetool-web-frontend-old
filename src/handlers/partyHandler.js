const axios = require('axios');
const handler = require('../handlers/handler');
const tokenHandler = require('../handlers/tokenHandler');

function getWeddingParty(tokens, customerId) {
  return axios.get('/customer/' + customerId + '/weddingparty', {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}

function getParty(tokens, partyId) {
  return axios.get('/party/' + partyId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
function updateParty(tokens, partyId, fields) {
  return axios.put('/party/' + partyId, fields, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
function removeParty(tokens, partyId) {
  return axios.delete('/party/' + partyId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
function restoreParty(tokens, partyId) {
  return axios.post('/party/' + partyId + '/restore', {}, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
module.exports = {
  getWeddingParty,
  getParty,
  updateParty,
  removeParty,
  restoreParty
};
