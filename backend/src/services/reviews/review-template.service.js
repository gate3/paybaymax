class ReviewTemplates {
  constructor({
    models, reviewValidator, loggingHelper, CONSTANTS,
  }) {
    this.models = models;
    this.reviewValidator = reviewValidator;
    this.Logger = loggingHelper;
    this.roles = CONSTANTS.ROLES;
  }

  async create(data) {
    try {
      await this.reviewValidator.validateReviewTemplateData(data);
    } catch (e) {
      const errObj = new Error(e.message);
      errObj.status = 400;
      throw errObj;
    }
    const { creatorId, name } = data;
    const employee = await this.models.employees.findOne({
      where: { id: creatorId },
      include: {
        as: 'user',
        model: this.models.user,
      },
    });

    if (this.roles.ADMIN !== employee.user.role) {
      const errObj = new Error('You are not authorized to create a template.');
      errObj.status = 403;
      throw errObj;
    }

    if (!employee) {
      /**
         * If the creatorId doesn't exist, its probably a problem on the frontend.
         * I will display a generic error and log this issue to be attended to later.
         */
      // Log the error
      this.Logger.error(`Invalid userid ${creatorId} supplied for review template creation`);
      throw new Error('An error occurred. Please try again or contact us.');
    }
    const templateExists = await this.models.review_templates.count({
      where: {
        creatorId,
        name,
      },
    });
    // templateExists === 1 is true
    if (templateExists) {
      throw new Error('This review template exists already. Please use a new name.');
    }
    const result = await this.models.review_templates.create({
      ...data,
      content: JSON.stringify(data.content),
    });
    return result.toJSON();
  }

  async edit(reviewTemplateId, data) {
    if (reviewTemplateId == null) {
      // Displaying thesame generic error for thesame reason as above
      throw new Error('An error occurred. Please try again or contact us.');
    }
    try {
      await this.reviewValidator.validateReviewTemplateData(data);
    } catch (e) {
      throw new Error(e.message);
    }
    return this.reviewTemplatesModel.update(data, {
      where: {
        _id: reviewTemplateId,
      },
    });
  }

  fetchTemplates(data) {
    /**
     * In case a limit isn't supplied, its good practice to supply
     * one so we don't make the UI non-responsive
     *
     * */
    const { limit = 1000, offset = 0 } = data;
    const options = {
      limit,
      offset,
      include: {
        as: 'creator',
        model: this.models.employees,
      },
    };
    return this.models.review_templates.findAll(options);
  }

  fetchTemplateById(templateId) {
    if (templateId == null) {
      throw new Error('Please select a template to fetch its information.');
    }
    return this.models.review_templates.findOne({
      where: { id: templateId },
      include: {
        as: 'creator',
        model: this.models.employees,
      },
    });
  }

  deleteTemplateById(templateId) {
    if (templateId == null) {
      throw new Error('Please select a template to delete.');
    }
    return this.reviewTemplatesModel.destroy({ where: { id: templateId } });
  }
}

module.exports = ReviewTemplates;
