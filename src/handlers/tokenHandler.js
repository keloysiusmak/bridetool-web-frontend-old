const axios = require('axios');
const config = require('../../config/config.' + process.env.NODE_ENV);
const handler = require('../handlers/handler');

function getApiToken() {
  return axios.get('/auth/api/token', {
    headers: {
      'api-key': config.developerKeys.apiKey,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}

async function checkAccessTokenExpired(store, tokens) {
  const now = Math.floor(Date.now() / 1000);
  if (now - tokens.storedTokensTime > 5) {
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
  return axios.post('/auth/refresh', {
    refreshToken: tokens.refreshToken
  }, {
    headers: {
      'api-token': tokens.apiToken,
    },
  }).then(response => {
    response = handler(response);
    return response.result;
  });
}

module.exports = {
  getApiToken,
  checkAccessTokenExpired
};
