const router = require("express").Router()
const TestController = require("../controllers/test")

//Get all tests
router.get("/", TestController.findAll)
//Get latest test
router.get("/latest", TestController.findLatest)
//Get test
router.get("/find/:id", TestController.findById)
//Create test
router.post("/", TestController.create)
//Update test
router.put("/:id", TestController.update)
//Delete test
router.delete("/:id", TestController.delete)

module.exports = router