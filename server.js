import "dotenv/config"
import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000



//middleware
app.use(express.json())
app.use(express.urlencoded( { extended: false }))


app.get("/" , (req, res) =>{
    return res.send("Hi  ... ")
})


//ROUTES
import userRouter from "./routes/userRoute.js"
import bookRouter from "./routes/bookRoute.js"

app.use("/api/user",userRouter)
app.use("/api/book",bookRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

