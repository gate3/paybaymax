/* eslint-disable no-underscore-dangle */
const encryptionHelper = require('bcryptjs');

module.exports = ({ models, authTokenHelper }) => async (data) => {
  if (data == null || data.username == null || data.password == null) {
    const errObj = new Error('Please provide username and password');
    errObj.status = 400;
    throw errObj;
  }
  const { username, password } = data;

  const query = { username };

  const errorMessage = 'Password or username incorrect.';

  const user = await models.user.findOne({ where: query });
  if (user == null) throw new Error(errorMessage);

  if (encryptionHelper.compareSync(password, user.password)) {
    const token = authTokenHelper.generateToken({
      userId: user._id, role: user.role,
    });

    const employee = await models.employees.findOne({
      where: {
        userId: user.id,
      },
      attributes: {
        include: [['id', 'employeeId']],
        /**
         * - The updatedAt is not needed on the frontend and should
         * only be known on the backend
         *
         * - The id has been renamed so no need to send it again
         * */
        exclude: ['id', 'updatedAt'],
      },
    });

    return {
      ...employee.toJSON(),
      token,
    };
  }
  throw new Error(errorMessage);
};
