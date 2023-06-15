const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const database = () => {
        mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log('connected to database');
}).catch((err) => {
    console.log("error connecting to database", err);
})
}
module.exports = database;
