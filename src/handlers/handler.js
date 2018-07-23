module.exports = (response) => {
  const data = response.data;

  const allowedStatuses = [200, 201];
  if (!allowedStatuses.includes(data.status)) {
    throw {
      code: data.status,
      details: data.details
    }
  }

  return data;
}
