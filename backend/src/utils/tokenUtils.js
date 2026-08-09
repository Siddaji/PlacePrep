import crypto from "crypto";
import jwt from "jsonwebtoken";


//  Generates a random 32-byte hex string token and its SHA256 hashed version.
 
export const generateRandomToken = () => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  return { rawToken, hashedToken };
};


//   Hashes a raw token string with SHA256.

export const hashToken = (rawToken) => {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
};


//Generates a signed JWT token for a user.

export const generateJWT = (userId) => {
  const secret = process.env.JWT_SECRET || "placeprep_jwt_secret_key_2026_super_secure";
  return jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
};
