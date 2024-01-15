const router = require("express").Router()
const artistControllers = require("./../controllers/artistControllers")


router.get("/artists", artistControllers.getAllArtists)
router.get("/artists/:id", artistControllers.getArtistById)
router.post("/artists", artistControllers.postArtist)
router.delete("/artists/:id", artistControllers.deleteArtist)
router.put("/artists/:id", artistControllers.putAtrists)
router.patch("/artists/:id", artistControllers.patchAtrists)


module.exports = router