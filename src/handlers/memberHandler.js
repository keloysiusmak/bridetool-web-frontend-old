const axios = require('axios');
const handler = require('../handlers/handler');
const tokenHandler = require('../handlers/tokenHandler');

function getMember(tokens, memberId) {
  return axios.get(axios.defaults.memberUrl + '/member/' + memberId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function addMember(tokens, coupleId, fields) {
  return axios.post(axios.defaults.memberUrl + '/couple/' + coupleId + '/member', fields, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function updateMember(tokens, memberId, fields) {
  return axios.put(axios.defaults.memberUrl + '/member/' + memberId, fields, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function deleteMember(tokens, memberId) {
  return axios.delete(axios.defaults.memberUrl + '/member/' + memberId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function restoreMember(tokens, memberId) {
  return axios.post(axios.defaults.memberUrl + '/member/' + memberId + '/restore', {}, {
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
  getMember,
  addMember,
  updateMember,
  deleteMember,
  restoreMember
};
