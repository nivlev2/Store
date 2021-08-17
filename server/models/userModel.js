const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const userSchema = new mongoose.Schema(
  {
    name: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    cart: {
      type: Object,
      default: {},
    },
    lastOrders: {
      type: Array,
      default: [],
    },
  },
  { minimize: false }
);

exports.UserModel = mongoose.model("users", userSchema);

exports.validUser = (_dataBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(99).required(),
    lastName: Joi.string().min(2).max(99).required(),
    email: Joi.string().min(4).max(99).required(),
    password: Joi.string().min(3).max(99).required(),
    cart: Joi.object().min(0),
    lastOrders: Joi.array().min(0),
  });
  return joiSchema.validate(_dataBody);
};

// exports.validCart = (_dataBody) =>{

// }

exports.validLogin = (_dataBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(2).max(99).required(),
    password: Joi.string().min(2).max(99).required(),
    cart: Joi.object(),
  });
  return joiSchema.validate(_dataBody);
};
exports.validDel = (_dataBody) => {
  let joiSchema = Joi.object({
    _id: Joi.string().required(),
  });
  return joiSchema.validate(_dataBody);
};
//check it
exports.validUpdate = (_dataBody) => {
  let joiSchema = Joi.object({
    cart: Joi.object().required(),
  });
  return joiSchema.validate(_dataBody);
};
exports.getToken = (_userId) => {
  return jwt.sign({ _id: _userId }, "secretData", {
    expiresIn: "60mins",
  });
};
exports.getAdminToken = (_userId) => {
  return jwt.sign({ _id: _userId }, "admin", {
    expiresIn: "60mins",
  });
};
