const axios = require('axios');
const handler = require('../handlers/handler');

function loginAccount(tokens, username, password) {
  return axios.post('/account/login', {
    username,
    password,
  }, {
    headers: {
      'api-token': tokens.apiToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
function changePassword(tokens, accountId, oldPassword, newPassword) {
  return axios.put('/account/' + accountId + '/password', {
    oldPassword,
    newPassword
  }, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
function updateAccount(tokens, accountId, fields) {
  return axios.put('/account/' + accountId, fields, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
module.exports = {
  loginAccount,
  changePassword,
  updateAccount
};
