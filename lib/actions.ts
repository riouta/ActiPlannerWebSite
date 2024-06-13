// app/lib/actions.ts
'use server'

import { getSession } from 'next-auth/react';

export async function serverAction() {
  const session = await getSession();
  const userRole = session?.user?.role as 'SimpleUser' | 'Admin'; // Cast role


  if (userRole !== 'Admin') {
    throw new Error('Unauthorized access: User does not have admin privileges.');
  }

  // Proceed with the action for authorized users
  // ... implementation of the action
}
