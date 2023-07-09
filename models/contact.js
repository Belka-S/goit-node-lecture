const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { mongooseError, joiError } = require('../helpers');

// Validation
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const groupList = ['work', 'sport', 'private'];

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for the contact!'],
      minlength: [3, 'Name must be at least 3 characters long!'],
    },
    email: {
      type: String,
      match: [emailRegex, 'Email schema: anpch@example.com'],
    },
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
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  { versionKey: false, timestamps: true },
);

const addSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailRegex).error(joiError.emailError),
  phone: Joi.string().pattern(phoneRegex).error(joiError.emailError),
  favorite: Joi.boolean(),
  group: Joi.string()
    .valid(...groupList)
    .required(),
});

contactSchema.post('save', mongooseError); // Change error status

const updateFavoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

const schemas = { addSchema, updateFavoriteSchema };

const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };
