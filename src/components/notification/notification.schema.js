const Joi = require('@hapi/joi');
const { message, id, limit } = require('../../validation/global.schema');

const pointer = Joi.string().min(0).max(50);
const date = Joi.date();

// Generic Schema.
const genericSchema = Joi.object().keys({
  service_id: id.required(),
  user_id: id.required(),
  message: message.required(),
  pointer,
  created_at: date.required(),
  acced_at: date,
  mail_sent_at: date,
  sms_sent_at: date,
  did_mail_sent_at: date,
});

const postSchema = Joi.object().keys({
  service_id: id.required(),
  user_id: id.required(),
  message: message.required(),
  pointer,
});

const putSchema = Joi.object().keys({
  pointer,
  acced_at: date,
  mail_sent_at: date,
  sms_sent_at: date,
  did_mail_sent_at: date,
});

const querySchema = Joi.object().keys({
  user_id: id.required(),
  service_id: id,
  limit,
  acced_at: date,
  mail_sent_at: date,
  sms_sent_at: date,
  did_mail_sent_at: date,
});

const responseSchema = Joi.object().keys({
  service_id: id.required(),
  user_id: id.required(),
  message: message.required(),
  pointer,
  created_at: date.required(),
  acced_at: date,
  mail_sent_at: date,
  sms_sent_at: date,
  did_mail_sent_at: date,
});

module.exports = {
  genericSchema,
  querySchema,
  putSchema,
  postSchema,
  responseSchema,
};
