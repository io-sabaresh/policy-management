'use strict';
const Joi = require('joi');

module.exports = Joi.object().keys({
    "agent": Joi.string().required(),
    "userType": Joi.string().required(),
    "policy_mode": Joi.number(),
    "producer": Joi.string(),
    "policy_number": Joi.string().required(),
    "premium_amount_written": Joi.number().positive(),
    "premium_amount": Joi.number().positive().required(),
    "policy_type": Joi.string(),
    "company_name": Joi.string().required(),
    "category_name": Joi.string().required(),
    "policy_start_date": Joi.date().required(),
    "policy_end_date": Joi.date().required(),
    "csr": Joi.string(),
    "account_name": Joi.string().required(),
    "email": Joi.string().email().required(),
    "gender": Joi.string(),
    "firstname": Joi.string().required(),
    "city": Joi.string(),
    "account_type": Joi.string(),
    "phone": Joi.alternatives().try(Joi.number(), Joi.string()),
    "address": Joi.string(),
    "state": Joi.string(),
    "zip": Joi.alternatives().try(Joi.number(), Joi.string()),
    "dob": Joi.date().max(new Date()),
    "primary": Joi.string(),
    "Applicant ID": Joi.string(),
    "agency_id": Joi.string(),
    "hasActive ClientPolicy": Joi.boolean()
});