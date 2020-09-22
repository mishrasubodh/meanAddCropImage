const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
//set up express app
var cors = require('cors')
const app = express();
//set up mongoose 
var mongoose = require('mongoose');
//set port
port = process.env.PORT || 4000;
//database connection
mongoose.connect('mongodb://127.0.0.1:27017/user', {
    useCreateIndex: true,
    useNewUrlParser: true
})
mongoose.Promise = global.Promise;
// use for cors error
app.use(cors());
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
//require apis from routers
app.use('/api', require('./routes/api'));
app.use(express.static(path.join(__dirname, 'uploads')));
// error hanling
app.use((err, req, res, next) => {
    res.status(200).send({
        error: err
    });
});
//port listen
app.listen(port, () => {
    console.log('server is running on  port 4000')
});