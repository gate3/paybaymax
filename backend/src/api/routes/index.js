const express = require('express');

const route = express.Router();

const authRoutes = require('./auth');
const reviewsRoute = require('./reviews');

authRoutes(route);
reviewsRoute(route);

module.exports = route;
