const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
};

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

const idRequestValidation = data => {
    const schema = Joi.object({
        sex: Joi.string(),
        country: Joi.string(),
        eye_color: Joi.string(),
        hair_color: Joi.string(),
        ethnicity: Joi.string(),
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.faceRequestValidation = faceRequestValidation;
module.exports.idRequestValidation = idRequestValidation;