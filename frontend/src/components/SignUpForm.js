import React, { useState } from 'react';
import { Button, TextField, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link,useHistory } from 'react-router-dom';

const StyledForm = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px',
  maxWidth: '400px',
  margin: 'auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
});

const StyledTextField = styled(TextField)({
  margin: '10px',
  width: '100%',
});

const StyledButton = styled(Button)({
  marginTop: '20px',
  width: '100%',
  backgroundColor: '#1976D2',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#1565C0',
  },
});

const StyledError = styled('p')({
  color: 'red',
  marginTop: '10px',
});

const StyledLoginLink = styled(Link)({
  marginTop: '20px',
  textDecoration: 'none',
  color: '#1976D2',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  '& > span': {
    marginLeft: '5px',
  },
});

const SignupForm = () => {
  const history=useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://login-frhn.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        setError(data.error || 'Signup failed');
      }
      history.push('/dummy-page');
    } catch (error) {
      console.error('Signup error:', error);
      setError('Internal Server Error');
    }

    setLoading(false);
  };

  return (
    <StyledForm>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <StyledTextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <StyledTextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledTextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <StyledTextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <StyledButton
        variant="contained"
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
      </StyledButton>
      {error && <StyledError>{error}</StyledError>}
      <StyledLoginLink to="/login">
        Already have an account? <span>Login here</span>
      </StyledLoginLink>
    </StyledForm>
  );
};

export default SignupForm;
