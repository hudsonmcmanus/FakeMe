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

//
const faceRequestValidation = data => {
    const schema = Joi.object({
        emotion: Joi.string().valid('joy', 'neutral', 'surprise'),
        sex: Joi.string().valid("male", "female"),
        age: Joi.string().valid('infant', 'child', 'young-adult', 'adult', 'elderly'),
        ethnicity: Joi.string().valid('white', 'asian', 'latino', 'black'),
        eye_color: Joi.string().valid('brown', 'blue', 'gray', 'green'),
        hair_color: Joi.string().valid('brown', 'blond', 'black', 'gray', 'red'),
        hair_length: Joi.string().valid('short', 'medium', 'long')
    });
    return schema.validate(data);
};

const idRequestValidation = data => {
    const schema = Joi.object({
        sex: Joi.string().valid("male", "female"),
        age: Joi.number().integer().greater(0).max(150).positive(),
        country: Joi.string().valid("usa", "canada", "russia", "ukraine", 
        "poland", "netherlands", "sweden", "china"),
        eye_color: Joi.string().valid('brown', 'blue', 'gray', 'green'),
        hair_color: Joi.string().valid('brown', 'blond', 'black', 'gray', 'red'),
        ethnicity: Joi.string().valid('white', 'asian', 'latino', 'black')
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.faceRequestValidation = faceRequestValidation;
module.exports.idRequestValidation = idRequestValidation;