const Joi = require('@hapi/joi');
const { message, id } = require('../../validation/global.schema');

const pointer = Joi.string().min(0).max(50);
const date = Joi.date();

// Generic Schema.
const genericSchema = Joi.object().keys({
  service_id: id,
  user_id: id,
  message,
  pointer,
  created_at: date,
  acced_at: date,
  mail_sent_at: date,
  sms_sent_at: date,
  did_mail_sent_at: date,
});

const requestSchema = Joi.object().keys({
  service_id: id,
  user_id: id,
  message,
  pointer,
  acced_at: date,
  mail_sent_at: date,
  sms_sent_at: date,
  did_mail_sent_at: date,
});

const responseSchema = Joi.object().keys({
  service_id: id,
  user_id: id,
  message,
  pointer,
  created_at: date,
  acced_at: date,
  mail_sent_at: date,
  sms_sent_at: date,
  did_mail_sent_at: date,
});

module.exports = {
  genericSchema,
  requestSchema,
  responseSchema,
};
