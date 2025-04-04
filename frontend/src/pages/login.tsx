import { useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
}

function LoginPage({ onLogin }: { onLogin: (token: string, role: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
      const { token } = response.data;

      // Decode the token to extract the role
      const decoded: DecodedToken = jwtDecode(token);
      const { role } = decoded;

      // Pass the token and role to the parent component
      onLogin(token, role);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
    >
      <Card style={{ maxWidth: 400, width: '100%', padding: '24px' }}>
        <CardContent style={{ padding: '32px' }}>
          <Typography
            variant='h4'
            gutterBottom
            align='center'
          >
            Login
          </Typography>
          {error && (
            <Typography
              color='error'
              gutterBottom
              align='center'
            >
              {error}
            </Typography>
          )}
          <TextField
            label='Username'
            variant='outlined'
            margin='normal'
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label='Password'
            type='password'
            variant='outlined'
            margin='normal'
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            style={{ marginBottom: '16px' }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            variant='text'
            color='secondary'
            fullWidth
            onClick={() => (window.location.href = '/signup')}
          >
            Don't have an account? Sign Up
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPage;
