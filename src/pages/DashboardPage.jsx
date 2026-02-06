import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CheckCircleOutline as CheckIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { accessToken, user } = location.state || {};

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!accessToken || !user) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>
          No authentication data found
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <CheckIcon
            sx={{
              fontSize: 80,
              color: '#7FB77E',
              backgroundColor: '#fff',
              borderRadius: '50%',
              p: 2,
              mb: 2,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              color: '#fff',
              fontWeight: 700,
              mb: 1,
            }}
          >
            Login Successful!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            Welcome to Tuga's App Dashboard
          </Typography>
        </Box>

        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 4,
            background: '#fff',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Avatar
              src={user.photoURL}
              alt={user.displayName}
              sx={{
                width: 100,
                height: 100,
                mb: 2,
                border: '4px solid #7FB77E',
              }}
            />
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {user.displayName}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {user.email}
            </Typography>
            <Chip
              label="Authenticated with Google"
              color="success"
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              fontWeight={600}
              gutterBottom
              sx={{ mb: 2 }}
            >
              Access Token
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                maxHeight: '200px',
                overflow: 'auto',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'monospace',
                  wordBreak: 'break-all',
                  fontSize: '0.75rem',
                  color: '#333',
                }}
              >
                {accessToken}
              </Typography>
            </Paper>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: 'block' }}
            >
              This is your Firebase ID token. It can be used to authenticate API requests.
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Paper>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            © 2026 Tuga's App. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardPage;
