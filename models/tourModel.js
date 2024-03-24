const mongoose = require('mongoose')

const tourSchame = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim:true
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a maxGroupSize']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: {
        type: Number,
    },
    summary: {
        type:String,
        trim:true,
        require:[true,'A tour must have a description']
    },
    description: {
        type:String,
        trim:true
    },
    imageCover: {
        type:String,
        require:[true,'A tour must have a image']
    },
    images: [String],
    createAt: {
        type:Date,
        default:Date.now()
    },
    startDates: [Date],  
})

const Tour = mongoose.model('Tour', tourSchame)

module.exports = Tour; 