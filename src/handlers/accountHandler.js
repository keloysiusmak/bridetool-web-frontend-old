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
function changePassword(accessToken, accountId, oldPassword, newPassword) {
  return axios.put('/account/' + accountId + '/password', {
    oldPassword,
    newPassword
  }, {
    headers: {
      'access-token': accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}
function updateAccount(accessToken, accountId, fields) {
  return axios.put('/account/' + accountId, fields, {
    headers: {
      'access-token': accessToken,
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
