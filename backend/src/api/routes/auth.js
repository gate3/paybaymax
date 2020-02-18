/* eslint-disable consistent-return */
/* eslint-disable no-empty */
const express = require('express');

const route = express.Router();

const DI = require('../../awilix').Container;

module.exports = (app) => {
  app.use('/auth', route);

  const loginRoute = async (req, res, next) => {
    try {
      const result = await DI.resolve('loginService')(req.body);
      return res.json({
        status: true,
        data: result,
      });
    } catch (e) {
      next(e);
    }
  };
  route.post('/login', loginRoute);
};
