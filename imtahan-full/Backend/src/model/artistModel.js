const mongoose = require("mongoose")

const artistSchema = mongoose.Schema({
    name: String,
    gender: String,
    age: String,
    genre: String
}
    ,
    {
        collection: "artists"
    })


const Artists = mongoose.model("artists", artistSchema)

module.exports = Artists