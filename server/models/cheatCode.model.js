const mongoose = require('mongoose');
const GameDolphineSchema = new mongoose.Schema({

    //cheat code model

    game: {
        type: String, 
        required: [ true, "Game name is required" ],
        trim: true,
        minlength: [2, "Game name must be at least 2 characters long!"]
    },

    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Game description cannot be empty!"],
        maxlength: [255, "Game description cannot exceed 255 characters!"]
    },

    instructions: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Instructions cannot be blank!"]
    },

    platform: {
        type: String,
        required: true,
        trim: true,
        minlength: [1, "Platform/console must be added"]
    }
    
}, { timestamps: true });

module.exports = mongoose.model('CheatCode', GameDolphineSchema);


