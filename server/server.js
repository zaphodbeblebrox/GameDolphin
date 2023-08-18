const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config')
require('./routes/cheatCode.route')(app);

app.listen(8000, () => {
    console.log("listening on port 8000")
})