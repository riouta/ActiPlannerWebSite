import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { User as PrismaUser } from '@prisma/client';
import { DefaultSession } from 'next-auth';


declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
	interface JWT {
		
   }
 }