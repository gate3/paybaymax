
module.exports = {
  genericRequiredField: (field) => {
    const errObj = new Error(`${field} is a required field and must be supplied`);
    errObj.status = 400;
    return errObj;
  },
  genericContentField: new Error('Invalid values provided for content field. Please check and try again.'),
};
