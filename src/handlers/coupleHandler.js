const axios = require('axios');
const handler = require('../handlers/handler');

function getCouple(tokens, coupleId) {
  return axios.get('/couple/' + coupleId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
module.exports = {
  getCouple,
};
