/* eslint-disable consistent-return */
/* eslint-disable no-empty */

const express = require('express');

const route = express.Router();

const DI = require('../../awilix').Container;

module.exports = (app) => {
  app.use('/review', route);

  // Create review type
  const createReviewTemplateRoute = async (req, res, next) => {
    try {
      await DI.resolve('reviewTemplateService').create(req.body);
      return res.json({
        status: true,
        message: 'Review Template has been saved successfully.',
      });
    } catch (e) {
      console.log(e)
      next(e);
    }
  };
  route.post('/templates/create', createReviewTemplateRoute);

  // Edit review type
  const editReviewTemplateRoute = async (req, res, next) => {
    try {
      const result = await DI.resolve('reviewTemplateService')(req.body);
      return res.json({
        status: true,
        data: result,
      });
    } catch (e) {
      next(e);
    }
  };
  route.put('/templates/edit', editReviewTemplateRoute);

  // Fetch review templates
  const fetchReviewsTemplateRoute = async (req, res, next) => {
    try {
      const result = await DI.resolve('reviewTemplateService').fetchTemplates(req.query);
      return res.json({
        status: true,
        data: result,
      });
    } catch (e) {
      next(e);
    }
  };
  route.get('/templates', fetchReviewsTemplateRoute);

  const fetchReviewTemplateByIdRoute = async (req, res, next) => {
    try {
      const { reviewTemplateId } = req.params;
      const result = await DI.resolve('reviewTemplateService').fetchTemplateById(reviewTemplateId);
      return res.json({
        status: true,
        data: result,
      });
    } catch (e) {
      next(e);
    }
  };
  route.get('/templates/:reviewTemplateId', fetchReviewTemplateByIdRoute);

  const assignReviewRoute = async (req, res, next) => {
    try {
      const result = await DI.resolve('reviewsService').assign(req);
      return res.json({
        status: true,
        data: result,
      });
    } catch (e) {
      next(e);
    }
  };
  route.post('/assign/:reviewTemplateId', assignReviewRoute);

  // We can include a delete route here

  // Review an employee
  const reviewEmployeeRoute = async (req, res, next) => {
    try {
      const result = await DI.resolve('reviewsService').create(req);
      const message = result ? 'Review Saved Successfully' : 'There was a problem saving the review.';
      return res.json({
        status: true,
        message,
      });
    } catch (e) {
      next(e);
    }
  };
  route.put('/create/:reviewId', reviewEmployeeRoute);

  // Fetch employee reviews
  const fetchEmployeeReviewsRoute = (req, res) => {

  };
  route.get('/:employeeId', fetchEmployeeReviewsRoute);

  // Fetch specific employee review
  const fetchSpecificEmployeeReviewsRoute = (req, res) => {

  };
  route.get('/:employeeId/review/:reviewId', fetchSpecificEmployeeReviewsRoute);

  // Fetch specific employee review
  const deleteEmployeeReviewsRoute = (req, res) => {

  };
  route.delete('/:employeeId/review/:reviewId', deleteEmployeeReviewsRoute);
};
