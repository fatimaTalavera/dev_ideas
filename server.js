const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();


// This will fire our mongoose.connect statement to initialize our database connection
require("./server/config/mongoose.config");

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

app.listen(8000, () => console.log("The server is all fired up on port 8000"));
