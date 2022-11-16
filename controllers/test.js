const Test = require("../models/test")

class TestController {
  static async findAll (req, res, next) {
    try {
      const tests = await Test.find()
      res.status(200).json(tests.reverse())
    } catch (err) {
      next(err)
    }
  }

  static async findById (req, res, next) {
    try {
      const test = await Test.findById(req.params.id)
      res.status(200).json(test)
    } catch (err) {
      next(err)
    }
  }

  static async findLatest (req, res, next) {
    try {
      const test = await Test.find().sort({createdAt: -1}).limit(1)
      res.status(200).json(test)
    } catch (err) {
      next(err)
    }
  }

  static async create (req, res, next) {
    const newTest = new Test(req.body)
    try {
      const savedTest = await newTest.save()
      res.status(201).json(savedTest)
    } catch (err) {
      next(err)
    }
  }

  static async update (req, res, next) {
    try {
      const updatedTest = await Test.findByIdAndUpdate(
        req.params.id, { $set: req.body }, { new: true }
      )
      res.status(200).json(updatedTest)
    } catch (err) {
      next(err)
    }
  }

  static async delete (req, res, next) {
    try {
      await Test.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: "The test has been deleted" })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TestController