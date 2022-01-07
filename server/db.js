const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://cloud_notebook_admin:JEE9vQCcgH7FEnfN@cloudnotebook-database.oqbzq.mongodb.net/cloudNotebook_database?retryWrites=true&w=majority";

const connectToMongo = () => {
    mongoose.connect(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true },
        ()=>{
        console.log("Connected to Mongo Successfully");
    });
}

module.exports = connectToMongo;