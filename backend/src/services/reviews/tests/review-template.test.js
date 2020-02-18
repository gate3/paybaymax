const { makeMockModels } = require('sequelize-test-helpers');
const reviewValidator = require('../review.validator');
const { expect, sinon } = require('../../../helpers/test-dependencies.helper');
const DI = require('../../../awilix');

const [userModel, reviewTemplatesModel] = [
  makeMockModels({
    findOne: sinon.stub(),
  }),
  makeMockModels({
    findOne: sinon.stub(),
    findAll: sinon.stub(),
  }),
];

const dependencies = {
  userModel,
  reviewTemplatesModel,
};

const data = {
  creatorId: 'SomeId',
  name: 'Growth Review',
  content: JSON.stringify({
    previousGoals: 'Achieve 60% growth in sales',
    percentageOfCompletion: 70,
    newGoalsSet: 'Convert new 100% of sales leads.',
  }),
};

describe('Review Template Service', () => {
  describe('Should', () => {
    before(async () => {
        
    });
  });
});
