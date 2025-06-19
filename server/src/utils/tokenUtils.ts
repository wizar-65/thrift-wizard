import jwt from "jsonwebtoken"
import crypto from "crypto"

export function generateRefreshToken(id: string, username: string) {
  const secretKey = process.env.REFRESH_TOKEN_SECRET
  if (!secretKey) {
    throw new Error("Server configuration error: Missing JWT secret")
  }
  return jwt.sign({ id, username }, secretKey, { expiresIn: "7d" })
}

export function generateAccessToken(id: string, username: string) {
  const secretKey = process.env.ACCESS_TOKEN_SECRET
  if (!secretKey) {
    throw new Error("Server configuration error: Missing JWT secret")
  }
  return jwt.sign({ id, username }, secretKey, { expiresIn: "30s" })
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex")
}
