const axios = require('axios');
const handler = require('../handlers/handler');
const tokenHandler = require('../handlers/tokenHandler');

function getWeddingParty(tokens, coupleId) {
  return axios.get('/couple/' + coupleId + '/weddingparty', {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}

function getAvailableParties(tokens, coupleId, startTime, endTime) {
  return axios.post('/couple/' + coupleId + '/available', {
    startTime,
    endTime
  }, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}

function getParty(tokens, partyId) {
  return axios.get('/party/' + partyId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function addParty(tokens, coupleId, fields) {
  return axios.post('/couple/' + coupleId + '/party', fields, {
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
  return axios.put('/party/' + partyId, fields, {
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
  return axios.delete('/party/' + partyId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function restoreParty(tokens, partyId) {
  return axios.post('/party/' + partyId + '/restore', {}, {
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
  getWeddingParty,
  getParty,
  getAvailableParties,
  addParty,
  updateParty,
  deleteParty,
  restoreParty
};
