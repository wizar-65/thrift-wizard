import dotenv from "dotenv"
import express from "express"
import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"
import cookieParser from "cookie-parser"

// look for a .env file and pull in any environment variables from that file
dotenv.config({ path: "./.env" })

// Create an express app
const app = express()

// Middleware
app.use(cookieParser())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

// Start server
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
