const mongoose = require('mongoose') 
const Joi = require('joi')

const suggestSchema = new mongoose.Schema({
name:{
    type:String
},
email:{
    type:String
},
type:{
    type:String
},
details:{
    type:String
}
})

const Suggest = mongoose.model("Suggest",suggestSchema)

function suggestValidation (object){
    const schema = Joi.object({
name:Joi.string().required(),
email:Joi.string().email(),
type:Joi.string().required(),
details:Joi.string().required()

    })
    return schema.validate(object)
}

module.exports = {Suggest,suggestValidation}

