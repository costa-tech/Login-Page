import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Link,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  Apple as AppleIcon,
  Facebook as FacebookIcon,
} from '@mui/icons-material';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../config/firebase';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
    setAuthError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate username (email)
    if (!formData.username) {
      newErrors.username = 'Email is required';
    } else if (!validateEmail(formData.username)) {
      newErrors.username = 'Please enter a valid email address';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    // If no errors, proceed with login
    if (Object.keys(newErrors).length === 0) {
      // Here you would typically call your backend API
      console.log('Login with:', formData);
      setAuthError('Demo mode: Backend authentication not implemented');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setAuthError('');
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const accessToken = await user.getIdToken();
      
      // Navigate to dashboard with user info
      navigate('/dashboard', { 
        state: { 
          accessToken,
          user: {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }
        } 
      });
    } catch (error) {
      console.error('Google login error:', error);
      setAuthError(error.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setAuthError(`${provider} login is not implemented in this demo. Only Google login is functional.`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#ffffff',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
            minHeight: { md: '80vh' },
          }}
        >
          {/* Left Side - Login Form */}
          <Box
            sx={{
              flex: 1,
              maxWidth: { xs: '100%', md: '450px' },
              width: '100%',
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2rem', sm: '2.5rem' },
                  mb: 2,
                }}
              >
                Welcome back!
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: '0.95rem' }}
              >
                Simplify your workflow and boost your productivity with{' '}
                <strong>Tuga's App</strong>. Get started for free.
              </Typography>
            </Box>

            {authError && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: '10px' }}>
                {authError}
              </Alert>
            )}

            <Box component="form" onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                type="email"
                placeholder="Enter your email"
                value={formData.username}
                onChange={handleInputChange}
                error={!!errors.username}
                helperText={errors.username}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
                sx={{ mb: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ textAlign: 'right', mb: 3 }}>
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#000',
                  color: '#fff',
                  py: 1.5,
                  mb: 3,
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                }}
              >
                Login
              </Button>

              <Divider sx={{ mb: 3 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ px: 2 }}
                >
                  or continue with
                </Typography>
              </Divider>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  mb: 3,
                }}
              >
                <IconButton
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    width: 56,
                    height: 56,
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                    '&:disabled': {
                      backgroundColor: '#666',
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : <GoogleIcon />}
                </IconButton>
                <IconButton
                  onClick={() => handleSocialLogin('Apple')}
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    width: 56,
                    height: 56,
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                  <AppleIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleSocialLogin('Facebook')}
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    width: 56,
                    height: 56,
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                  <FacebookIcon />
                </IconButton>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Not a member?{' '}
                  <Link
                    href="#"
                    underline="hover"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 500,
                    }}
                  >
                    Register now
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Side - Illustration */}
          <Box
            sx={{
              flex: 1,
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '500px',
                textAlign: 'center',
              }}
            >
              <Box
                component="img"
                src="https://illustrations.popsy.co/green/meditation.svg"
                alt="Meditation illustration"
                sx={{
                  width: '100%',
                  height: 'auto',
                  mb: 4,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  fontSize: { md: '1.5rem', lg: '1.75rem' },
                }}
              >
                Make your work easier and organized
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  fontSize: { md: '1.5rem', lg: '1.75rem' },
                }}
              >
                with <strong>Tuga's App</strong>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
