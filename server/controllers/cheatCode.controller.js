const CheatCode = require('../models/cheatCode.model');

// create a cheat code
module.exports.createCheat = (req, res) => {
    CheatCode.create(req.body)
    .then(cheatCode => res.json(cheatCode))
    .catch(err => {
        if (err.code === 11000) {
            res.status(400).json({message: "game name must be included"});
        } else if (err.name === 'ValidationError') {
            return res.status(400).json(err);
        } else {
            return res.status(500).json(err);
        }
    });
}

// find all cheat codes
module.exports.getAllCheatCodes = (req, res) => {
    CheatCode.find({})
        .then(cheatCodes => {
            console.log(cheatCodes);
            res.json(cheatCodes)
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
}

// get one cheat code by id and its details
module.exports.getCheatCodeById = (req, res) => {
    CheatCode.findOne({_id: req.params.id})
    .then(cheatCode => res.json(cheatCode))
    .catch(err => res.json(err));
}

//update an existing cheat code
module.exports.updateCheatCode = (req, res) => {
    CheatCode.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
    .then(updatedCheatCode => res.json(updatedCheatCode))
    .catch(err => res.json(err))
}

// delete a cheat code
module.exports.deleteCheatCode = (req, res) => {
    CheatCode.deleteOne({_id: req.params.id})
    .then(deleteConfirmation => res.json(deleteConfirmation))
    .catch(err => res.json(err))
}