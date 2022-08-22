const express = require("express")
let router = express.Router()

router.post("/getarticle", require("../controller/post").getarticle)



module.exports = router