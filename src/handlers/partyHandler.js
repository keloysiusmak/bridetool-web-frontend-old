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
    return response.result;
  });
}

function getAvailableParties(tokens, coupleId, startTime, endTime) {
  return axios.post('/couple/' + coupleId + '/available-parties', {
    startTime,
    endTime
  }, {
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
function addParty(tokens, coupleId, fields) {
  return axios.post('/couple/' + coupleId + '/weddingparty', fields, {
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
function deleteParty(tokens, partyId) {
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
  getAvailableParties,
  addParty,
  updateParty,
  deleteParty,
  restoreParty
};
