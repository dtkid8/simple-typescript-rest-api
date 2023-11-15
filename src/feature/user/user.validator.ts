import Joi from "joi";

export const userValidatorUpdateSchema = Joi.object(
    {
        username: Joi.string().alphanum().min(5).max(20).messages(
            {
                'string.base': 'Username harus String',
                'string.min': 'Username harus minimal {#limit} karakter',
                'string.max': 'Username harus maksimal {#limit} karakter',
            }
        ),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,20}$')),
        email: Joi.string().email()
    }
);