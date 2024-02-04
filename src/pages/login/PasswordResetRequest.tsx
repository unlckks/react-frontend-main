import React, { useState } from 'react';
import AuthService from '../../services/auth';
import { Container, Typography, Button, TextField, Box } from '@mui/material';

const PasswordResetRequest: React.FC = () => {

  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //input email 
    console.log(email); 


    // send Request link
    AuthService.resetPasswordRequest(email).then(
      () => {
        alert('Password reset link sent!'); 
      },
      (error) => {
  
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        alert(resMessage); 
      }
    );
  };

  // components render
  return (
    <Container maxWidth="sm" sx={{ mt: 8, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
      <Box sx={{ my: 4, mx: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" color="primary.main" gutterBottom>
          Reset Password
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Enter your email address below, and we'll email you a link to reset your password.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            label="Email Address"
            margin="dense"
            required
            fullWidth
            autoComplete="email"
            autoFocus
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ py: 1.5 }}>
            Send Reset Link
          </Button>
        </Box>
      </Box>
    </Container>
  );
  
};


export default PasswordResetRequest;
