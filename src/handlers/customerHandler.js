const axios = require('axios');
const handler = require('../handlers/handler');

function getCustomer(tokens, customerId) {
  return axios.get('/customer/' + customerId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
module.exports = {
  getCustomer,
};
