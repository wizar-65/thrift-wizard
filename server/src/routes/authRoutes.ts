import express, { Request, Response, NextFunction } from "express"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { User } from "../types/express"
import authenticateAccessToken from "../middlewares/authMiddleware"

dotenv.config()
const router = express.Router()

const users: User[] = []

let refreshTokens: string[] = []

router.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token)
  console.log(refreshTokens)
  res.sendStatus(204)
})

router.post("/token", (req, res) => {
  const refreshToken = req.body.token as string
  if (refreshToken == null) {
    res.sendStatus(401)
    return
  }
  if (!refreshTokens.includes(refreshToken)) {
    res.sendStatus(403)
    return
  }
  const secretKey = process.env.REFRESH_TOKEN_SECRET
  if (!secretKey) {
    throw new Error("Server configuration error: Missing JWT secret")
  }

  jwt.verify(refreshToken, secretKey, (err, user) => {
    if (err || !user) {
      res.sendStatus(403)
      return
    }

    const accessToken = generateAccessToken((user as User).id)
    res.json({ accessToken })
  })
})

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = { id: req.body.id, password: hashedPassword }
    users.push(newUser)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

router.post("/login", async (req: Request, res: Response) => {
  // Authenticate User
  const user = users.find((user) => user.id === req.body.id)
  if (user == null) {
    res.status(400).send("Cannot find user")
    return
  }
  try {
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.send("Invalid Credentials")
      return
    }
  } catch {
    res.send("Error")
  }

  const secretKey = process.env.ACCESS_TOKEN_SECRET
  if (!secretKey) {
    throw new Error("Server configuration error: Missing JWT secret")
  }

  const accessToken = generateAccessToken(user.id)
  const refreshToken = generateRefreshToken(user.id)
  refreshTokens.push(refreshToken)

  res.json({ accessToken, refreshToken })
})

function generateRefreshToken(id: string) {
  const secretKey = process.env.REFRESH_TOKEN_SECRET
  if (!secretKey) {
    throw new Error("Server configuration error: Missing JWT secret")
  }
  return jwt.sign({ id }, secretKey)
}

function generateAccessToken(id: string) {
  const secretKey = process.env.ACCESS_TOKEN_SECRET
  if (!secretKey) {
    throw new Error("Server configuration error: Missing JWT secret")
  }
  return jwt.sign({ id }, secretKey, { expiresIn: "15m" })
}

router.get("/users", authenticateAccessToken, (req, res) => {
  res.json(users.filter((user) => user.id === req.user.id))
})

export default router
