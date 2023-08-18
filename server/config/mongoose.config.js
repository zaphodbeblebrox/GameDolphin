const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/GameDolphine", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("establish connection to the server"))
    .catch(err => console.log("something went wrong when connecting to the database"))