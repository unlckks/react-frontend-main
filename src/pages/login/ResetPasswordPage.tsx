import React, { useState } from 'react';

import AuthService from '../../services/auth';

import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * define PasswordReset function
 */
const PasswordReset: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    if (!token) {
      setMessage('Token is missing. Please try again.');
      return;
    }

    AuthService.resetPassword(token, password).then(
      () => navigate('/login'),
   
      (error) => {
          //define a variable  to storage error message 
        const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        setMessage(resMessage);
      }
    );
  };

  // Components Render about ResetPassword Page
  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)' }}>
        <Typography component="h1" variant="h4" color="primary.main" gutterBottom>
          Reset Password
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Enter your new password below.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
          <TextField
            variant="filled"
            margin="dense"
            required
            fullWidth
            id="password"
            label="New Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            variant="filled"
            margin="dense"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="secondary" sx={{ mt: 2, py: 1 }}>
            Reset Password
          </Button>
        </Box>
        {message && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );

};

export default PasswordReset;
