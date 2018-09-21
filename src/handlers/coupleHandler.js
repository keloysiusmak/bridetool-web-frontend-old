const axios = require('axios');
const handler = require('../handlers/handler');

function getWeddingParty(tokens, coupleId) {
  return axios.get(axios.defaults.coupleUrl + '/couple/' + coupleId + '/weddingparty', {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}

function getAvailableParties(tokens, coupleId, startTime, endTime) {
  return axios.post(axios.defaults.coupleUrl + '/couple/' + coupleId + '/available', {
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
function getCouple(tokens, coupleId) {
  return axios.get(axios.defaults.coupleUrl + '/couple/' + coupleId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
module.exports = {
  getWeddingParty,
  getAvailableParties,
  getCouple,
};
