const IdeaController = require("../controllers/idea.controller");
const { authenticate } = require('../config/jwt.config')
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './server/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = app => {
  app.get("/api/ideas/", authenticate, IdeaController.findAllIdeas);
  app.get("/api/ideas/:id", authenticate, IdeaController.findOneSingleIdea);
  app.put("/api/ideas/update/:id", authenticate, IdeaController.updateExistingIdea);
  app.put("/api/ideas/like/:id", authenticate, IdeaController.likeExistingIdea);
  app.post("/api/ideas/new", authenticate,upload.single('image'), IdeaController.createNewIdea);
  app.delete("/api/ideas/delete/:id", authenticate, IdeaController.deleteAnExistingIdea);
};