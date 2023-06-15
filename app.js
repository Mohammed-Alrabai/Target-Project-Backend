// imports the express module
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const database = require('./Config/Database');
const cors = require('cors');



const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

// connecting to the database
database();
// Require routes


// Api routes


// Api routes for employees


// Api routes for admin


// Api routes for departments


app.get('/', (req, res) => {
    res.send(" Hello World");
})

app.listen(port, () => {
    console.log("listening on http://localhost:" + port);
})