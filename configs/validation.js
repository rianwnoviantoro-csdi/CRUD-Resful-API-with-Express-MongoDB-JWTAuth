const joi = require('@hapi/joi')
const Joi = require('@hapi/joi')

const registerValid = (data) => {
    const schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6)
    })

    return schema.validate(data)
}

const loginValid = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6)
    })

    return schema.validate(data)
}

module.exports.registerValid = registerValid
module.exports.loginValid = loginValid