const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

module.exports.authenticate = (req,res,next) => {
    jwt.verify(req.cookies.userToken, SECRET, (err,payload)=>{
        if(err){
            console.log('authentication error',err)
            res.status(401).json({verified:false})
        }else{
            req.user = payload?._id
            req.username = payload?.username
            next()
        }
    })
}