const axios = require('axios');
const handler = require('../handlers/handler');

function loginAccount(tokens, username, password) {
  return axios.post(axios.defaults.accountUrl + '/account/login', {
    username,
    password,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'api-token': tokens.apiToken,
    },
    crossdomain: true
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function changePassword(tokens, accountId, oldPassword, newPassword) {
  return axios.put(axios.defaults.accountUrl + '/account/' + accountId + '/password', {
    oldPassword,
    newPassword
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
function updateAccount(tokens, accountId, fields) {
  return axios.put(axios.defaults.accountUrl + '/account/' + accountId, fields, {
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
  loginAccount,
  changePassword,
  updateAccount
};
