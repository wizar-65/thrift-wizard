import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../types/express"
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils"
import pool from "../models/db"

// these need to go in the DB
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

    const accessToken = generateAccessToken((user as User).username)
    res.json({ accessToken })
  })
}

export async function register(req: Request, res: Response) {
  try {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const checkUserResult = await pool.query(
        "SELECT * FROM public.users WHERE username = $1",
        [username]
      )

      if (checkUserResult.rows.length > 0) {
        res.status(400).send({ message: "Username already exists." })
      }

      const insertResult = await pool.query(
        "INSERT INTO public.users (username, password_hash) VALUES ($1, $2) RETURNING *",
        [username, hashedPassword]
      )
      res.json(insertResult.rows[0])
    } catch (err) {
      console.error(err)
      res.status(500).send()
    }

    res.status(201).send()
  } catch {
    res.status(500).send()
  }
}

export async function login(req: Request, res: Response) {
  // Authenticate User
  const { username, password } = req.body
  try {
    const userQuery = await pool.query(
      "SELECT * FROM public.users WHERE username = $1",
      [username]
    )
    if (userQuery.rows.length === 0) {
      res.status(400).send({ message: "Invalid username or password" })
      return
    }

    const user = userQuery.rows[0]

    if (!(await bcrypt.compare(password, user.password_hash))) {
      res.send("Invalid username or password")
      return
    }

    const secretKey = process.env.ACCESS_TOKEN_SECRET
    if (!secretKey) {
      throw new Error("Server configuration error: Missing JWT secret")
    }

    const accessToken = generateAccessToken(user.username)
    const refreshToken = generateRefreshToken(user.username)
    refreshTokens.push(refreshToken)

    res.json({ accessToken, refreshToken })
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: "Server error" })
  }
}

export function logout(req: Request, res: Response) {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token)
  res.sendStatus(204)
}
