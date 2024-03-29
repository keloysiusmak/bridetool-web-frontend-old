const axios = require('axios');
const config = require('../../dist/config/config.' + process.env.NODE_ENV);
const handler = require('../handlers/handler');

function getApiToken() {
  return axios.get(axios.defaults.tokenUrl + '/auth/token', {
    headers: {
      'api-key': config.developerKeys.apiKey,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}

function getMemberAccessToken(memberId) {
  return axios.get(axios.defaults.tokenUrl + '/auth/member/token', {
    headers: {
      'member-id': memberId,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}

async function checkAccessTokenExpired(store, tokens) {
  const now = Math.floor(Date.now() / 1000);
  if (now - tokens.storedTokensTime > 3200 && tokens.refreshToken) {
    const handleRefreshToken = await refreshToken(tokens);
    return {
      expired: true,
      accessToken: handleRefreshToken.accessToken,
      storedTokensTime: now
    }
  } else {
    return {
      expired: false
    };
  }
}

function refreshToken(tokens) {
  return axios.get(axios.defaults.tokenUrl + '/auth/refresh', {
    headers: {
      'refresh-token': tokens.refreshToken
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}

module.exports = {
  getApiToken,
  getMemberAccessToken,
  checkAccessTokenExpired
};
