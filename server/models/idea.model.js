const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
	description: {
		type: String,
		required: [true, 'Description is required']
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
        ref: "User"
	},
	likes: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: "User"
	}]
}, { timestamps: true });

const Idea = mongoose.model("Idea", IdeaSchema);

module.exports = Idea;