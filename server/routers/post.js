const express = require("express")
let router = express.Router()

router.post("/getpostlist", require("../controller/post").getpostlist)



module.exports = router