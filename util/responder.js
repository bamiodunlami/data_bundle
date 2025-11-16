export function serviceResponse(statusCode, success, message, data) {
  return {
    statusCode,
    success,
    message,
    data,
  };
}

export function response(res, statusCode, success, message, data) {
  return res.status(statusCode).send({
    success,
    message,
    data,
  });
}
