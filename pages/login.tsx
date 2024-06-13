import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import ErrorAlert from '../components/ErrorAlert';
import LoadingSpinner from '../components/LoadingSpinner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Head from 'next/head';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Successful login
        localStorage.setItem('token', data.token);
        console.log(data.token);
        router.push('/CRUD/add');
      } else {
        setError(data.error || 'Failed to login. Please check your credentials.');
      }
    } catch (error) {
      setError('Failed to login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <Head>
      <title>Activity</title>
    </Head>

    <div className="login-container">
      <h2>Login</h2>
      {error && <ErrorAlert message={error} />}
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button disabled={loading} type="submit" onClick={handleLogin}>
          {loading ? <LoadingSpinner /> : 'Login'}
        </Button>
      </form>
      <p>Don't have an account? <Link href="/signup" passHref legacyBehavior>Sign Up</Link></p>
      </div>
      <Footer />
   </>
  );
};

export default LoginPage;
