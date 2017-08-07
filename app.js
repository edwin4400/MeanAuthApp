const   express = require("express"),
        path = require("path"),
        bodyParser = require("body-parser"),
        passport = require("passport"),
        cors = require("cors"),
        mongoose = require("mongoose");
        
const app = express();

const port = process.env.PORT;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.listen(port, () => {
    console.log('Server started on port: ' + port);
});