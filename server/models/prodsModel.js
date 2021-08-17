const mongoose = require('mongoose');
const Joi = require('joi');

const productsSchema = mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    image:String
})

exports.ProductsModel = mongoose.model("products", productsSchema)

exports.validProd = (_dataBody) =>{
    const joiSchema = Joi.object({
        name:Joi.string().min(2).max(99).required(),
        price:Joi.number().min(1).required(),
        category:Joi.string().min(2).max(99).required(),
        image:Joi.string().min(2).max(500),
    })
    return joiSchema.validate(_dataBody)
}

exports.validCartUpdate = (_dataBody) =>{
    let joiSchema = Joi.object({
        _id:Joi.string().required(),
        amount:Joi.number().min(1).max(99).required()
    })
    return joiSchema.validate(_dataBody)
}