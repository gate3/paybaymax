const { expect } = require('./helpers/test-dependencies.helper');
const DI = require('./awilix');

describe('Dependency injection', () => {
  it('should contain dependencies', () => {
    const { cradle } = DI.Container;
    expect(cradle).to.have.ownProperty('userModel');
    expect(cradle).to.have.ownProperty('reviewsModel');
    expect(cradle).to.have.ownProperty('reviewTemplatesModel');
    expect(cradle).to.have.ownProperty('employeeModel');
    // expect(cradle).to.have.ownProperty('signupService');
    expect(cradle).to.have.ownProperty('loginService');
    expect(cradle).to.have.ownProperty('authValidator');
    expect(cradle).to.have.ownProperty('CONSTANTS');
  });
});
