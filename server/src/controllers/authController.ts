import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../types/express"
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils"

// these need to go in the DB
const users: User[] = []
let refreshTokens: string[] = []

export function token(req: Request, res: Response) {
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
}

export async function register(req: Request, res: Response) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = { id: req.body.id, password: hashedPassword }
    users.push(newUser)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
}

export async function login(req: Request, res: Response) {
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
}

export function logout(req: Request, res: Response) {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token)
  res.sendStatus(204)
}
