const axios = require('axios');
const handler = require('../handlers/handler');

function getNotifications(tokens, memberId) {
  return axios.post(axios.defaults.memberUrl + '/member/' + memberId + '/notifications', {}, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
module.exports = {
  getNotifications
};
