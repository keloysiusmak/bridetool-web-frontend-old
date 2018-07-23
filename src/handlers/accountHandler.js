const axios = require('axios');
const handler = require('../handlers/handler');

function loginAccount(apiToken, username, password) {
  return axios.post('/account/login', {
    username,
    password,
  }, {
    headers: {
      'api-token': apiToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
module.exports = {
  loginAccount,
};
