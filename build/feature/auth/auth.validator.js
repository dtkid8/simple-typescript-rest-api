"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const authValidatorSchema = joi_1.default.object({
    username: joi_1.default.string().alphanum().min(5).max(20).required().messages({
        'string.base': 'Username harus String',
        'string.min': 'Username harus minimal {#limit} karakter',
        'string.max': 'Username harus maksimal {#limit} karakter',
        'any.required': 'Masukkan Username',
    }),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{5,20}$')).required(),
    email: joi_1.default.string().email().required()
});
exports.default = authValidatorSchema;
