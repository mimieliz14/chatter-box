const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const authRoutes = require("./routes/authRoutes")
const errorHandler = require("./middleware/errorHandler")

dotenv.config()

const app = express()

app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).
then(() => console.log("MongoDB connected")).
catch((err) => console.log("MongoDB error:", err))


app.get("/", (req, res) => {
    res.send("ChatterBox API running")
})

app.use("/api/auth", authRoutes)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})