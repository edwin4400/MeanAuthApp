const   express = require("express"),
        path = require("path"),
        bodyParser = require("body-parser"),
        passport = require("passport"),
        cors = require("cors"),
        config = require("./config/database"),
        mongoose = require("mongoose");

//Connect To Database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
    console.log('Database connected at ' + config.database);
});

//On Connection Error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

const app = express();

//Users Routes
const users = require("./routes/users");

//Port number
const port = process.env.PORT;

//CORS Middleware
app.use(cors());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html")); //__dirname means current directory
})

//Start Server
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});