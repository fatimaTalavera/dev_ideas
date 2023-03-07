const Idea = require("../models/idea.model");

module.exports.findAllIdeas = (req, res) => {
  Idea.find().collation({'locale':'en'}).sort({createdAt: -1}).populate('owner', '-password')
    .then(allDaIdeas => res.json({ ideas: allDaIdeas, username: req.username, user: req.user }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleIdea = (req, res) => {
	Idea.findOne({ _id: req.params.id }).populate('owner', '-password').populate('likes', '-password')
		.then(oneSingleIdea => res.json({ idea: oneSingleIdea, username: req.username, user: req.user }))
		.catch(err => res.status(404).json(err));
};

module.exports.createNewIdea = (req, res) => {
  Idea.create({...req.body, owner: req.user})
    .then(newlyCreatedIdea => res.json({ idea: newlyCreatedIdea }))
    .catch(err => res.status(400).json(err));
};

module.exports.updateExistingIdea = (req, res) => {
  Idea.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedIdea => res.json({ idea: updatedIdea }))
    .catch(err => res.status(400).json(err));
};

module.exports.likeExistingIdea = (req, res) => {
  if(req.body.liked){
    Idea.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user } },
      { new: true, useFindAndModify: false }
    ).then(updatedIdea => res.json({ idea: updatedIdea }))
    .catch(err => res.status(400).json(err));
  }else {
    Idea.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user } },
      { new: true, useFindAndModify: false }
    ).then(updatedIdea => res.json({ idea: updatedIdea }))
    .catch(err => res.status(400).json(err));
  }
};

module.exports.deleteAnExistingIdea = (req, res) => {
  Idea.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
