const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const router = require('./routes/user.routes')
const cookieParser = require('cookie-parser');
const product_router = require('./routes/product.routes');
const cart_router = require('./routes/cart.routes');


dotenv.config()

const app = express()

app.use(cors({
  origin:process.env.FRONT_URL,
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api",router)
app.use("/api/product",product_router)
app.use("/api/cart",cart_router)

//connect to database
mongoose.connect(process.env.MONGO)
  .then(()=>{
    console.log("connected to database")
  })
  .catch((error)=>{
     console.log("Error connecting to database");
  })

const PORT = 8000 || process.env.PORT

app.listen(PORT ,()=>{
    console.log("Listening on port 8000");
})

