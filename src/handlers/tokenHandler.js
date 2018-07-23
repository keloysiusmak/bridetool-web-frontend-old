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
    return response.result.apiToken;
  });
}

module.exports = {
  getApiToken,
};
