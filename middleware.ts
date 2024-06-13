// middleware.ts
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function middleware(req:any) {
  const session = await getSession({ req });

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

 export const config = {
   matcher: ['/CRUD/[id]/:path*'], // Protect all routes under /CRUD/[id]
 };
