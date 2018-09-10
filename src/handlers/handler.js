module.exports = (response) => {
  const data = response.data;

  const allowedStatusCodes = [200, 201];
  if (!allowedStatusCodes.includes(data.statusCode)) {
    throw {
      statusCode: data.statusCode,
      error: data.error,
      message: data.message
    };
  }

  return data;
};
