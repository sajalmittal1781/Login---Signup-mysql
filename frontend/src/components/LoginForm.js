import React, { useState } from 'react';
import { Button, TextField, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link ,useHistory} from 'react-router-dom';

const StyledForm = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px', 
  maxWidth: '400px', 
  margin: 'auto', 
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px', 
  backgroundColor: 'white',
});

const StyledTextField = styled(TextField)({
  margin: '10px',
  width: '100%', 
});

const StyledButton = styled(Button)({
  marginTop: '20px',
  width: '100%',
});

const StyledError = styled('p')({
  color: 'red',
  marginTop: '10px',
});

const StyledSignUpLink = styled(Link)({
  marginTop: '20px',
  textDecoration: 'none',
  color: '#1976D2', 
  fontWeight: 'bold',
});

const LoginForm = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://login-frhn.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
       
        alert(data.message);
      } else {
        
        setError(data.error || 'Login failed');
      }
      history.push('/dummy-page');
    } catch (error) {
      console.error('Login error:', error);
      setError('Internal Server Error');
    }

    setLoading(false);
  };

  return (
    <StyledForm>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <StyledTextField
        label="Username or Email"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <StyledTextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
      </StyledButton>
      {error && <StyledError>{error}</StyledError>}
      <StyledSignUpLink to="/signup">Don't have an account? Sign up here</StyledSignUpLink>
    </StyledForm>
  );
};

export default LoginForm;
