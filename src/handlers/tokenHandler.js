const axios = require('axios');
const config = require('../../dist/config/config.' + process.env.NODE_ENV);
const handler = require('../handlers/handler');

function getApiToken() {
  return axios.get('/auth/token', {
    headers: {
      'api-key': config.developerKeys.apiKey,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}

async function checkAccessTokenExpired(store, tokens) {
  const now = Math.floor(Date.now() / 1000);
  if (now - tokens.storedTokensTime > 3600) {
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
  return axios.get('/auth/refresh', {
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
  checkAccessTokenExpired
};
