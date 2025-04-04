import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { darkTheme } from './theme/theme';
import LoginPage from './pages/login';
import SignUpPage from './pages/signUp';
import Dashboard from './pages/dashboard';
import Navbar from './components/Navbar'; // Import the Navbar component
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));
  const [role, setRole] = useState<string | null>(null); // Store the role

  const handleLogin = (token: string, role: string) => {
    sessionStorage.setItem('token', token); // Save token in session storage
    sessionStorage.setItem('role', role); // Save role in session storage
    setIsAuthenticated(true);
    setRole(role);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Remove token from session storage
    sessionStorage.removeItem('role'); // Remove role from session storage
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        {isAuthenticated && (
          <Navbar
            onLogout={handleLogout}
            role={role}
          />
        )}{' '}
        {/* Pass role to Navbar */}
        <Routes>
          <Route
            path='/login'
            element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to='/dashboard' />}
          />
          <Route
            path='/signup'
            element={!isAuthenticated ? <SignUpPage toggleForm={() => console.log('Toggle form')} /> : <Navigate to='/dashboard' />}
          />
          <Route
            path='/dashboard'
            element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to='/login' />}
          />
          <Route
            path='*'
            element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
