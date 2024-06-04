import React, { useState } from 'react';
import Button from '../components/Button';
import ErrorAlert from '../components/ErrorAlert';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';

const SignupPage: React.FC = () => {
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

      const response = await axios.put('/api/auth', { newEmail: email, newPassword: password });
      if (response.status === 201) {
        // Successful signup
        console.log(response.data.message);
      } else {
        setError('Failed to sign up. Please try again later.');
      }
    } catch (error) {
      setError('Failed to sign up. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <ErrorAlert message={error} />}
      <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
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
    </div>
  );
};

export default SignupPage;
