import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../components/Button';
import ErrorAlert from '../components/ErrorAlert';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
     if (password !== confirmPassword) {
       setError('Passwords do not match');
       return;
     }

    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();
      
      if (response.status === 201) {
        // Successful signup
        //console.log(response.data.message);
        window.location.href = '/login';
      } else {
        setError(data.error ||'Failed to sign up. Please try again later.');
      }
    } catch (error) {
      setError('Failed to sign up.');
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

      <div className="signup-container">
        <h2>Sign Up</h2>
        {error && <ErrorAlert message={error} />}
        <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
        
        <label>Username:</label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

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
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button disabled={loading} type="submit" onClick={handleSignup}>
            {loading ? <LoadingSpinner /> : 'Sign Up'}
          </Button>
        </form>
        <p>Already have an account? <Link href="/login" passHref legacyBehavior>Login</Link></p>
      </div>
      <Footer />
    </>
  );
};

export default SignupPage;
