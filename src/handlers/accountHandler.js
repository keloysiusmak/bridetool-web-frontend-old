const axios = require('axios');
const config = require('../../config/config.' + process.env.NODE_ENV);
const handler = require('../handlers/handler');

function loginAccount(apiToken, username, password) {
  return axios.post('/account/login', {
    username,
    password
  },{
    headers: {
      'api-token': apiToken
    }
  }).then(response => {
    response = handler(response);
    return response.result.account;
  });
}
module.exports = {
  loginAccount
}
