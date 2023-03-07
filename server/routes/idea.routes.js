const IdeaController = require("../controllers/idea.controller");
const { authenticate } = require('../config/jwt.config')

module.exports = app => {
  app.get("/api/ideas/", authenticate, IdeaController.findAllIdeas);
  app.get("/api/ideas/:id", authenticate, IdeaController.findOneSingleIdea);
  app.put("/api/ideas/update/:id", authenticate, IdeaController.updateExistingIdea);
  app.put("/api/ideas/like/:id", authenticate, IdeaController.likeExistingIdea);
  app.post("/api/ideas/new", authenticate, IdeaController.createNewIdea);
  app.delete("/api/ideas/delete/:id", authenticate, IdeaController.deleteAnExistingIdea);
};