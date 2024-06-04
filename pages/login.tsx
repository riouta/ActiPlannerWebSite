import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../components/Button';
import ErrorAlert from '../components/ErrorAlert';
import LoadingSpinner from '../components/LoadingSpinner';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Adjusted fetch request to match the updated handler
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.status === 200) {
        // Successful login
        console.log(data.token);
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
    <div>
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
      <Link href="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default LoginPage;
