const Joi = require('joi');

// Register Validate
class UserValidate {
    register(data) {
        const schema = Joi.object({
            name: Joi.string()
                .min(4)
                .required(),
            email: Joi.string()
                .email()
                .min(6)
                .required(),
            password: Joi.string()
                .min(6)
                .required(),

        })
        return schema.validate(data)
    }


    login(data) {
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .min(6)
                .required(),
            password: Joi.string()
                .min(6)
                .required(),

        })
        return schema.validate(data)
    }
}
module.exports = new UserValidate

