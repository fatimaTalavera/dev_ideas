const UserController = require('../controllers/user.controller')
const { authenticate } = require('../config/jwt.config')

module.exports = (app) =>{
    app.post('/api/signup', UserController.signupUser)
    app.post('/api/login', UserController.loginUser) 
    app.get('/api/logout', authenticate, UserController.logoutUser)
    app.get("/api/users/:id", authenticate, UserController.findOneSingleUser);
}