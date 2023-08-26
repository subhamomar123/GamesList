const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Url: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

NewSchema.pre('save', function (next) {
    if (!this.Date || this.Date === '') {
        this.Date = Date.now();
    }
    next();
});

module.exports = mongoose.model('games' , NewSchema);