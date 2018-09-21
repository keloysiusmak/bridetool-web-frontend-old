const axios = require('axios');
const handler = require('../handlers/handler');

function getBudget(tokens, budgetId) {
  return axios.get(axios.defaults.budgetUrl + '/budget/' + budgetId, {
    headers: {
      'access-token': tokens.accessToken,
    },
  }).then(response => {
    response = handler(response);
    return response.data;
  });
}
function updateBudget(tokens, budgetId, fields) {
  return axios.put(axios.defaults.budgetUrl + '/budget/' + budgetId, fields, {
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
  getBudget,
  updateBudget
};
