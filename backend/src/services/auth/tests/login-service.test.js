/* eslint-disable no-underscore-dangle */
const { makeMockModels } = require('sequelize-test-helpers');
const randomString = require('randomstring');

const { expect, sinon } = require('../../../helpers/test-dependencies.helper');
const DI = require('../../../awilix');

const loginService = require('../login.service');

const authTokenHelper = DI.Container.resolve('authTokenHelper');
const CONSTANTS = DI.Container.resolve('CONSTANTS');

const data = {
  _id: randomString.generate(),
  username: 'username',
  password: 'password',
  firstName: 'Doyin',
  lastName: 'Olarewaju',
  email: 'doyinolarewaju@gmail.com',
  role: CONSTANTS.ROLES.EMPLOYEE,
  // Running the function each time slows down test, so I decided to hardcode the equivalent
  encryptedPassword: '$2a$10$Czp6pJbMe8gAbo3ekYfMSu5HxFIVmDUXIa8DuhWoyZ3DIcYmplFWq',
};

const [userModel, employeeModel] = [
  makeMockModels({
    findOne: sinon.stub(),
  }),
  makeMockModels({
    findOne: sinon.stub(),
  }),
];

const dependencies = {
  userModel,
  employeeModel,
  authTokenHelper,
};
let result;
let authTokenStub;
const token = 'Some token';

describe('Login Service', () => {
  describe('Should', () => {
    before(async () => {
      const {
        username, firstName, lastName, email,
      } = data;

      userModel.findOne.resolves({
        username,
        password: data.encryptedPassword,
        _id: data._id,
        role: CONSTANTS.ROLES.EMPLOYEE,
      });
      employeeModel.findOne.resolves({ firstName, lastName, email });
      authTokenStub = sinon.stub(authTokenHelper, 'generateToken');
      authTokenStub.returns(token);
      result = await loginService(dependencies)({ ...data });
    });
    it('run and return the correct values', async () => {
      const expected = {
        ownerId: data._id,
        lastName: data.lastName,
        firstName: data.firstName,
        email: data.email,
        token,
      };
      expect(result).to.deep.equal(expected);
    });

    it('functions should be called with correct values', async () => {
      expect(userModel.findOne.called).to.be.eq(true);
      expect(employeeModel.findOne.called).to.be.eq(true);
      expect(authTokenStub.called).to.be.eq(true);

      expect(userModel.findOne.calledWith({
        where: { username: data.username },
      })).to.be.eq(true);

      expect(employeeModel.findOne.calledWith({
        where: { userId: data._id },
      })).to.be.eq(true);

      expect(authTokenStub.calledWith({
        userId: data._id, role: data.role,
      })).to.be.eq(true);
    });
  });

  describe('Should Fail', () => {
    before(() => {
      const {
        username, firstName, lastName, email,
      } = data;

      userModel.findOne.resolves({
        username,
        password: data.encryptedPassword,
        _id: data._id,
        role: CONSTANTS.ROLES.EMPLOYEE,
      });
      employeeModel.findOne.resolves({ firstName, lastName, email });
      // result = await loginService(dependencies)({ ...data });
    });

    it('due to no incorrect input', async () => expect(
      loginService(dependencies)(),
    ).to.eventually.be.rejected
      .and.to.be.an.instanceOf(Error));

    it('due to no incorrect input', async () => expect(
      loginService(dependencies)({ username: data.username, password: 'wrongpass' }),
    ).to.eventually.be.rejected
      .and.to.be.an.instanceOf(Error));
  });
});
