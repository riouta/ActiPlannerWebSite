// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req:any) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

 export const config = {
   matcher: ['/CRUD/[id]/:path*'], // Protect all routes under /CRUD/[id]
 };
