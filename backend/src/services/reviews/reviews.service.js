class Reviews {
  constructor({
    models, reviewValidator, loggingHelper, CONSTANTS,
  }) {
    this.models = models;
    this.reviewValidator = reviewValidator;
    this.Logger = loggingHelper;
    this.roles = CONSTANTS.ROLES;
  }

  async assign(ctx) {
    const { body, params } = ctx;
    await this.reviewValidator.validateAssignReviewsData(body);
    const { assignedBy, reviewer } = body;
    const { reviewTemplateId } = params;
    const templateExists = await this.models.review_templates.count({
      where: {
        id: reviewTemplateId,
      },
    });
    if (!templateExists) {
      throw new Error('Invalid template selected.');
    }
    return this.models.reviews.create({
      assignedById: assignedBy,
      reviewerId: reviewer,
      reviewTemplateId,
    });
  }

  async create(ctx) {
    const { body, params } = ctx;
    const a = await this.models.reviews.update({
      content: JSON.stringify(body.content),
      reviewAnswered: true,
    }, {
      where: {
        id: params.reviewId,
      },
    });
    if (a[0]) {
      return true;
    }
    return false;
  }

  fetchReviews(data) {
    const { limit = 1000, offset = 0 } = data;
    const options = {
      limit,
      offset,
      include: [
        {
          as: 'reviewer',
          model: this.models.employees,
        },
        {
          as: 'assignedBy',
          model: this.models.employees,
        },
      ],
    };
    return this.models.reviews(options);
  }

  fetchReviewsId(reviewId) {
    return this.models.reviews({
      where: {
        id: reviewId,
      },
      include: [
        {
          as: 'reviewer',
          model: this.models.employees,
        },
        {
          as: 'assignedBy',
          model: this.models.employees,
        },
      ],
    });
  }
}

module.exports = Reviews;
