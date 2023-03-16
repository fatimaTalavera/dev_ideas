const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY
const EXPIRATION_TIME = 9000000

module.exports = {
    findOneSingleUser: (req, res) => {
        User.findOne({ _id: req.params.id }).select("-password")
            .then(oneSingleUser => res.json({ user: oneSingleUser, username: req.username }))
            .catch(err => res.status(404).json(err));
    },
    getUser: (req, res) => {
        User.findOne({ _id: req.user }).select("name lastname imageUrl alias email")
            .then(usuario => res.json({ user:usuario }))
            .catch(err => res.status(404).json(err));
    },

    editUser : (req, res)=>{
        let imgPath = null;
        var elementos = {};
        if(typeof req.body.imgName !== 'undefined' && req.body.imgName != 'undefined' ){
            imgPath= `http://localhost:8000/uploads/${req.body.imgName}`;
            elementos = {   name: req.body.name,
                            lastname: req.body.lastname,
                            alias: req.body.alias,
                            imageUrl: imgPath,
            };
        }else{
            elementos ={    name: req.body.name,
                            lastname: req.body.lastname,
                            alias: req.body.alias
            }
        }

        User.findByIdAndUpdate(
            req.user,
            elementos,
            { new: true, useFindAndModify: false }
        ).then(usuarioN => res.json({ usuario: usuarioN }))
        .catch(err => res.status(400).json(err));
    },
    signupUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body)
            const userToken = jwt.sign({ _id: newUser._id, username: newUser.name }, SECRET)
            console.log("token", userToken)
            res.status(201).cookie('userToken', userToken, { httpOnly: true, expires: new Date(Date.now() + EXPIRATION_TIME) })
                .json({ successMessage: 'Registered user', user: newUser })
        } catch (error) {
            res.status(401).json(error)
        }
    },

    loginUser: async (req, res) => {
        User.findOne({ email: req.body.email }).then(user => {
            bcrypt
                .compare(req.body.password, user.password)
                .then(passwordIsValid => {
                    if (passwordIsValid) {
                        const userToken = jwt.sign({_id: user._id, username: user.name}, SECRET)
                        res.status(201)
                            .cookie('userToken', userToken, {httpOnly:true, expires:new Date(Date.now() + EXPIRATION_TIME)})
                            .json({ msg: "success!", user: user })
                    } else {
                        res.json({ msg: "Invalid Email or Password" });
                    }
                })
                .catch(err => res.json({ msg: "invalid login attempt" }));
        })
    },

    logoutUser: (req, res) => {
        res.clearCookie('userToken')
        res.json({ success: 'User logged out' })
    }

    

}