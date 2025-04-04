import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Navbar({ onLogout, role }: { onLogout: () => void; role: string | null }) {
  const navigate = useNavigate();

  return (
    <AppBar
      position='static'
      color='primary'
    >
      <Toolbar>
        {/* Logo/Title */}
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          ExpressBooker
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* <Button
            color='inherit'
            onClick={() => navigate('/dashboard')}
          >
            Book a Room
          </Button> */}
          {/* Conditionally render Admin button */}
          {role === 'Admin' && (
            <Button
              color='inherit'
              onClick={() => navigate('/admin')}
            >
              Admin
            </Button>
          )}
        </Box>

        {/* Logout Icon */}
        <IconButton
          color='inherit'
          onClick={onLogout}
        >
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
