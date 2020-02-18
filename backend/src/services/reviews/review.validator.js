const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const validationMessages = require('../../helpers/validation-messages.helper');

const validateReviewTemplateData = (data) => {
  const schema = Joi.object().keys({
    creatorId: Joi.string().required()
      .error(validationMessages.genericRequiredField('creatorId')),
    content: Joi.object().required()
      .error(validationMessages.genericContentField)
      .error(validationMessages.genericRequiredField('content')),
    name: Joi.string().required()
      .error(validationMessages.genericRequiredField('Template Name')),
  });
  return Joi.validate(data, schema);
};

const validateAssignReviewsData = (data) => {
  const schema = Joi.object().keys({
    reviewer: Joi.string().required()
      .error(validationMessages.genericRequiredField('reviewer')),
    assignedBy: Joi.string().required()
      .error(validationMessages.genericRequiredField('assignedBy')),
  });
  return Joi.validate(data, schema);
};

const validateReviewsData = (data) => {
  const schema = Joi.object().keys({
    content: Joi.string().required()
      .error(validationMessages.genericRequiredField('content')),
  });
  return Joi.validate(data, schema);
};

module.exports = () => ({
  validateReviewTemplateData,
  validateReviewsData,
  validateAssignReviewsData,
});
