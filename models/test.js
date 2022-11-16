const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	createdAt: {type: Date, default: new Date().toLocaleString()},
	totalCorrect: { type: Number },
	totalIncorrect: { type: Number },
	ratio: { type: Number },
	standardDeviation: { type: Number },
	duration: { type: Number },
	answerPerRound: { type: Number },
	gameHistory: {type: Array}
});

module.exports = mongoose.model("Test", TestSchema);
