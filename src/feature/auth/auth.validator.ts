import Joi from "joi";


export const authValidatorRegisterSchema = Joi.object(
    {
        username: Joi.string().alphanum().min(5).max(20).required().messages(
            {
                'string.base': 'Username harus String',
                'string.min': 'Username harus minimal {#limit} karakter',
                'string.max': 'Username harus maksimal {#limit} karakter',
                'any.required' : 'Masukkan Username',
            }
        ),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,20}$')).required(),
        email: Joi.string().email().required()
    }
);

export const authValidatorLoginSchema = Joi.object(
    {
        username: Joi.string().alphanum().min(5).max(20).required().messages(
            {
                'string.base': 'Username harus String',
                'string.min': 'Username harus minimal {#limit} karakter',
                'string.max': 'Username harus maksimal {#limit} karakter',
                'any.required' : 'Masukkan Username',
            }
        ),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,20}$')).required(),
    }
);
