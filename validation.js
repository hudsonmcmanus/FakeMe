//VALIDATION
const Joi = require('@hapi/joi');

const faceRequestValidation = data => {
    const schema = Joi.object({
        emotion: Joi.string(),
        sex: Joi.string(),
        age: Joi.string(),
        ethnicity: Joi.string(),
        eye_color: Joi.string(),
        hair_color: Joi.string(),
        hair_length: Joi.string()
    });
    return schema.validate(data);
};

const identityRequestValidation = data => {
    const schema = Joi.object({
        sex: Joi.string(),
        country: Joi.string(),
        eye_color: Joi.string(),
        hair_color: Joi.string(),
        ethnicity: Joi.string(),
    });
    return schema.validate(data);
};

module.exports.faceRequestValidation = faceRequestValidation;
module.exports.identityRequestValidation = identityRequestValidation;