const UserController = require('../controllers/user.controller')
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

module.exports = (app) =>{
    app.post('/api/signup', UserController.signupUser)
    app.post('/api/login', UserController.loginUser) 
    app.get('/api/logout', authenticate, UserController.logoutUser)
    app.get("/api/users/:id", authenticate, UserController.findOneSingleUser);
    app.get("/api/user_show", authenticate, UserController.getUser);
    app.put("/api/users/edit", authenticate, upload.single('image'), UserController.editUser);
}