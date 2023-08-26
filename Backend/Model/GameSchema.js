const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Games:
 *       type: object
 *       required:
 *         - Name
 *         - Author
 *         - Url
 *         - Date
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the game
 *         Name :
 *           type: string
 *           description: The title of your game
 *         Author:
 *           type: string
 *           description: The game author
 *         Url:
 *           type: boolean
 *           description: URL of the game
 *         Date:
 *           type: string
 *           description: The creation date of game
 *  
 */

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

module.exports = mongoose.model('games', NewSchema);