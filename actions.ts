// app/actions.ts
'use server'

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function handleLogin(user) {
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
  // Redirect or handle the response after setting the cookie
}
