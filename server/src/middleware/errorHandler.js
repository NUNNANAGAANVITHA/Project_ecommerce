const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Internal server error.' : err.message;

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
