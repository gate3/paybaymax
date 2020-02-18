const routes = require('./routes');

module.exports = (app) => {
  const apiVersion = 'v1';
  const apiPrefix = `/api/${apiVersion}/`;

  /**
   * Health Check endpoints
   * Useful for health checks from different services.
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.use(apiPrefix, routes);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      status: false,
      error: err.message,
    });
  });
};
