const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const{todoRouter} = require("./Routes/todoRoutes")
const{router : userRouter} = require("./Routes/userRoutes")
const cp = require("cookie-parser")




// mongoose.connect(process.env.mongo_url)
// .then(() => {
//     console.log("DB Connected")

//     app.listen(process.env.PORT, () => {
//         console.log("Server Running")
//     })
// })
// .catch(() => {
//     console.log("Failed")
// })

app.use(cors({
    credentials : true,
    origin : "https://todo-frontend-gihk.vercel.app"
}))
app.use(express.json())
app.use(cp())
app.use("/api", todoRouter)
app.use("/api", userRouter)


// At the end of app.js

if (require.main === module) {
  // This means you ran 'node app.js' directly (traditional local dev)
  mongoose.connect(process.env.mongo_url)
    .then(() => {
      console.log("DB Connected");
      app.listen(process.env.PORT, () => {
        console.log("Server Running");
      });
    })
    .catch(() => {
      console.log("Failed");
    });
} else {
  // In Vercel/serverless, export app and let Vercel handle the requests
  mongoose.connect(process.env.mongo_url).then(() => {
    console.log("DB Connected by serverless wrapper");
  }).catch(() => {
    console.log("Failed");
  });
}

module.exports = app;
