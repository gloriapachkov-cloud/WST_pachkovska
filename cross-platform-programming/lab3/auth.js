import jwt from 'jsonwebtoken';
import { users } from './data.js';

// Для реального розгортання обов'язково задайте JWT_SECRET у середовищі.
export const JWT_SECRET = process.env.JWT_SECRET || 'rebelle-lab3-local-development-only';
export function createToken(user) {
  return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
}
export function getUserFromToken(token) {
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return users.find((user) => user.id === payload.userId) ?? null;
  } catch {
    return null;
  }
}
export function getUserFromAuthHeader(authHeader) {
  const match = /^Bearer\s+(\S+)$/i.exec(authHeader ?? '');
  return match ? getUserFromToken(match[1]) : null;
}
