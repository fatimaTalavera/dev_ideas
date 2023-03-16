const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
// SOCKET
const socket = require('socket.io')  
const Idea = require('./server/models/idea.model')

const app = express();
require('dotenv').config();

// This will fire our mongoose.connect statement to initialize our database connection
require("./server/config/mongoose.config");

app.use('/uploads', express.static('./server/uploads'))

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// middleware que agregar cookies a la solicitud
app.use(cookieParser())
// CORS 
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))


// This is where we import the users routes function from our user.routes.js file
const ideaRoutes = require("./server/routes/idea.routes");
ideaRoutes(app);
const userRoutes = require('./server/routes/user.routes')
userRoutes(app)

const server = app.listen(8000, () => console.log("The server is all fired up on port 8000"));


// socket configurations
const io = socket(server, {
    cors:{
        origin:'*',
        methods:['GET', 'POST']
    }
})

io.on('connection', (socket)=>{
    console.log("connected user socket", socket.id)
    socket.on("deleteIdea", (payload)=>{
        console.log("payload", payload)
        Idea.deleteOne({_id: payload})
        .then((res)=>{
            io.emit('deletedIdea', payload)
        }).catch((err)=>{
            console.log(err, "Error deleting idea")
        })
    })

    socket.on('disconnect', (socket)=>{
        console.log(`The user with id ${socket.id} just disconnected`)
    })
})