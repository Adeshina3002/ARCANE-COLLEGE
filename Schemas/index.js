const Joi = require ('joi')

function usersSchemas (input) {
    const schema = Joi.object({
        firstName : Joi.string().min(3).required(),
        lastName : Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        country: Joi.string().required(),
        mobileNumber: Joi.number().required(),
        dateOfBirth: Joi.date().greater('1-1-1930').required(),
        userRole: Joi.string().required(),
        courseRegistration: Joi.array().max(6).required()
    })
    return schema.validate(input)
}

const teachersSchemas = (input) => {
    const schema = Joi.object({
        firstName : Joi.string().min(3).required(),
        lastName : Joi.string().min(3).required(),
        email : Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        country: Joi.string().required(),
        mobileNumber : Joi.number().integer().required(),
        courseInCharge : Joi.array().required(),
        salary : Joi.number().integer().required(),
        // entitledBonus: Joi.boolean()
    })
    return schema.validate(input)
}

const checkCourse = () => {
    const schema = Joi.object({
        courseCode : Joi.string().required()
    })
    return schema.validate(input)
}


module.exports = {
    usersSchemas,
    teachersSchemas,
    checkCourse
}
