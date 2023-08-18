const CheatCodeController = require('../controllers/cheatCode.controller');

module.exports = (app) => {
    app.post('/api/cheatCode', CheatCodeController.createCheat);
    app.get('/api/cheatCode', CheatCodeController.getAllCheatCodes);
    app.get('/api/cheatCode/:id', CheatCodeController.getCheatCodeById);
    app.patch('/api/cheatCode/:id', CheatCodeController.updateCheatCode);
    app.delete('/api/cheatcode/:id', CheatCodeController.deleteCheatCode);
}