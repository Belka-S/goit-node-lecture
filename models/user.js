const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { mongooseError } = require('../helpers');

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = ['starter', 'pro', 'business'];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      minlength: [3, 'Name must be at least 3 characters long!'],
      unique: true,
    },
    email: {
      type: String,
      match: [emailRegex, 'Invalid email!'],
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      minlength: [6, 'Password must be at least 6 characters long!'],
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailRegex).message('Invalid email!').required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).message('Invalid email!').required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

userSchema.post('save', mongooseError); // Change error status

const schemas = { registerSchema, loginSchema, updateSubscriptionSchema };

const User = model('user', userSchema);

module.exports = { User, schemas };
