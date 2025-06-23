import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from "../utils/tokenUtils"
import pool from "../models/db"

export function token(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    res.status(400).json({ message: "No valid refresh token provided" })
    return
  }

  const secretKey = process.env.REFRESH_TOKEN_SECRET
  if (!secretKey) {
    throw new Error("Server configuration error: Missing JWT secret")
  }

  const { id, username } = jwt.verify(refreshToken, secretKey) as {
    id: string
    [key: string]: any
  }

  const accessToken = generateAccessToken(id, username)
  res.status(200).json({ accessToken })
}

export async function register(req: Request, res: Response) {
  try {
    const { username, firstName, lastName, email, password } = req.body
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
        "INSERT INTO public.users (username, first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4, $5)",
        [username, firstName, lastName, email, hashedPassword]
      )
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

    const accessToken = generateAccessToken(user.id, user.username)
    const refreshToken = generateRefreshToken(user.id, user.username)

    // insert refresh token into DB, expires in a week
    const insertRefreshTokenQuery = await pool.query(
      `INSERT INTO refresh_tokens (user_id, token_hash, created_at, expires_at)
       VALUES ($1, $2, now(), now() + interval '7 days')
      RETURNING *
    `,
      [user.id, hashToken(refreshToken)]
    )

    const userInfoQuery = await pool.query(
      `SELECT username, first_name, last_name, email
      FROM users
      WHERE username = $1`,
      [username]
    )

    const userInfo = userInfoQuery.rows[0]

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // expires in a week
        path: "/", // available to all routes
      })
      .json({ accessToken, userInfo })
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: "Server error" })
  }
}

export async function logout(req: Request, res: Response) {
  // this needs to delete from the DB and reset the refreshToken cookie

  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    res.status(400).json({ message: "No valid refresh token provided" })
    return
  }

  try {
    const secretKey = process.env.REFRESH_TOKEN_SECRET
    if (!secretKey) {
      throw new Error("Server configuration error: Missing JWT secret")
    }

    const decoded = jwt.verify(refreshToken, secretKey) as {
      id: string
      [key: string]: any
    }
    const userId = decoded.id

    await pool.query(
      `
      UPDATE refresh_tokens
      SET revoked_at = NOW()
      WHERE user_id = $1
      `,
      [userId]
    )
  } catch (err) {
    res.status(500).send({ message: "A server error occured" })
    return
  }

  res
    .cookie("refreshToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    })
    .sendStatus(204)
}
