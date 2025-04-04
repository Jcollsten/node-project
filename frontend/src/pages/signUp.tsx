import { useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent } from '@mui/material';

function SignUpPage({ toggleForm }: { toggleForm: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignUp = async () => {
    setError('');
    setSuccess(false);
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to register');
      }

      setSuccess(true);
      setUsername('');
      setPassword('');
    } catch (err: any) {
      setError(err.message);
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
            Sign Up
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
          {success && (
            <Typography
              color='primary'
              gutterBottom
              align='center'
            >
              Registration successful! You can now log in.
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
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Button
            variant='text'
            color='secondary'
            onClick={toggleForm}
            fullWidth
          >
            Already have an account? Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SignUpPage;
