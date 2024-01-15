const mongoose = require("mongoose")
const Artists = require("./../model/artistModel")

const getAllArtists = async (req, res) => {
    const allArtists = await Artists.find({})
    res.send(allArtists)

}

const getArtistById = async (req, res) => {
    console.log(req.params.id)
    const found = await Artists.findOne({ _id: req.params.id })
    console.log(found)
    res.send(found)
}

const deleteArtist = async (req, res) => {
    const deleted = await Artists.findByIdAndDelete({ _id: req.params.id })
}

const patchAtrists = async (req, res) => {
    let updated = await Artists.findOneAndUpdate({ _id: req.params.id }, req.body)

}

const putAtrists = async (req, res) => {
    let updated = await Artists.replaceOne({ _id: req.params.id }, req.body)

}

const postArtist = async (req, res) => {
    const newArtist = new Artists(req.body)
    newArtist.save()
}
module.exports = { getAllArtists, getArtistById, deleteArtist, patchAtrists, putAtrists, postArtist }