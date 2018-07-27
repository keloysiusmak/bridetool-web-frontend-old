const axios = require('axios');
const handler = require('../handlers/handler');

function getCustomer(customerId, accessToken) {
  return axios.get('/customer/' + customerId, {
    headers: {
      'access-token': accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
module.exports = {
  getCustomer,
};
