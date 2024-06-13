import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

const ProtectedPage = () => {
  return (
    <div>
      <h2>Protected Content</h2>
      <p>You can see this content because you are authenticated.</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default ProtectedPage;
