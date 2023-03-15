const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
	description: {
		type: String,
		required: [true, 'Description is required']
	},
	imgPath: {
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

IdeaSchema.methods.setImgPath = function setImgPath (filename) {
	IdeaSchema.imgPath = `http://localhost:8000/uploads/${filename}`
}

const Idea = mongoose.model("Idea", IdeaSchema);

module.exports = Idea;