const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { mongooseError } = require('../helpers');

// Validation
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
const groupList = ['work', 'sport', 'private'];

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for the contact!'],
    },
    email: String,
    phone: {
      type: String,
      match: [phoneRegex, 'Phone schema: (123) 456-7890'],
      required: true,
    },
    favorite: { type: Boolean, default: false },
    group: {
      type: String,
      enum: groupList,
      required: [true, `Set group: ${groupList.join(' / ')}`],
    },
  },
  { versionKey: false, timestamps: true },
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phoneRegex),
  favorite: Joi.boolean(),
  group: Joi.string()
    .valid(...groupList)
    .required(),
});

const updateFavoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

// Change error status
contactSchema.post('save', mongooseError);

const schemas = { addSchema, updateFavoriteSchema };

const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };
