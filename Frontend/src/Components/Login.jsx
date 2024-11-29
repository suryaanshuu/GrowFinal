import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Avatar,
  Grid,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MarketingBox from './MarketingBox';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || (!isLogin && !email)) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:5000/api/login', { username, password });
        localStorage.setItem('token', response.data.token);
        navigate('/admin');
      } else {
        const response = await axios.post('http://localhost:5000/api/signup', { username, email, password });
        localStorage.setItem('token', response.data.token); // Auto-login after signup
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || (isLogin ? 'Invalid username or password' : 'Signup failed'));
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <Container component="main" maxWidth="lg">
      {/* Flexbox container for MarketingBox and login form */}
      <div className="flex justify-between items-center space-x-4">
        {/* MarketingBox on the right */}
        <div className="flex-1 hidden lg:block">
          <MarketingBox />
        </div>

        {/* Login Box */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          className="bg-white rounded-lg shadow-xl p-8 w-full lg:w-1/3"
        >
          <Avatar sx={{ m: 1, bgcolor: 'green.500' }} className="bg-green-500">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className="text-center text-green-600 font-extrabold mb-4">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="space-y-4">
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 border-green-300 focus:ring-green-500 focus:border-green-500"
            />
            {!isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-green-300 focus:ring-green-500 focus:border-green-500"
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-green-300 focus:ring-green-500 focus:border-green-500"
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }} className="text-red-500 text-center">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-200"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  variant="body2"
                  onClick={toggleMode}
                  className="text-green-600 hover:text-green-700 cursor-pointer transition-all duration-200"
                >
                  {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </Container>
  );
};

export default AuthForm;
