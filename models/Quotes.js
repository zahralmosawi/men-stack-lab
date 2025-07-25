const {model, Schema} = require('mongoose')

const quotesSchema = new Schema({
    quote:{
        type: [String],
        required: true
    },
    author:String
},{timestamps:true})

const Quote = model('Quote', quotesSchema)
module.exports = Quote