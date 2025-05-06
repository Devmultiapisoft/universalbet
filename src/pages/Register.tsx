import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Stack,
  Divider,
  useTheme,
  Avatar
} from '@mui/material';
import { useWallet } from '../context/WalletContext';
import { register } from '../services/contractService';
import { getReferrerFromUrl } from '../utils/urlUtils';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinkIcon from '@mui/icons-material/Link';
import PersonIcon from '@mui/icons-material/Person';

const Register: React.FC = () => {
  const { isConnected, connectWallet, account, isRegistered } = useWallet();
  const navigate = useNavigate();
  const theme = useTheme();
  const [referrerAddress, setReferrerAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Steps for the registration process
  const steps = ['Connect Wallet', 'Enter Referrer', 'Complete Registration'];

  // Check for referrer in URL when component mounts
  useEffect(() => {
    const referrerFromUrl = getReferrerFromUrl();
    if (referrerFromUrl && ethers.utils.isAddress(referrerFromUrl)) {
      setReferrerAddress(referrerFromUrl);
    }
  }, []);

  // Update active step based on connection status
  useEffect(() => {
    if (!isConnected) {
      setActiveStep(0);
    } else if (!loading && !success) {
      setActiveStep(1);
    } else if (success) {
      setActiveStep(2);
    }
  }, [isConnected, loading, success]);

  // Redirect to dashboard if already registered
  useEffect(() => {
    if (isConnected && isRegistered) {
      navigate('/dashboard');
    }
  }, [isConnected, isRegistered, navigate]);

  const handleRegister = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Validate referrer address if provided
      let referrer = referrerAddress.trim();

      if (referrer && !ethers.utils.isAddress(referrer)) {
        throw new Error('Invalid referrer address');
      }

      // If no referrer is provided, use zero address
      if (!referrer) {
        referrer = ethers.constants.AddressZero;
      }

      // Call the register function
      await register(referrer);

      setSuccess(true);
      setActiveStep(2);

      // Redirect to dashboard after successful registration
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);

    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: { xs: 4, md: 6 } }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 600,
            background: 'linear-gradient(90deg, #6200ea, #00bcd4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 4
          }}
        >
          Register Your Account
        </Typography>

        {/* Registration Stepper */}
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mb: 5,
            '& .MuiStepLabel-root .Mui-completed': {
              color: theme.palette.success.main,
            },
            '& .MuiStepLabel-root .Mui-active': {
              color: theme.palette.primary.main,
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Card
          elevation={3}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)'
            }
          }}
        >
          <Box sx={{
            p: 3,
            background: 'linear-gradient(135deg, #6200ea 0%, #3f51b5 100%)',
            color: 'white'
          }}>
            <Typography variant="h5" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <PersonAddIcon sx={{ mr: 1 }} /> {success ? 'Registration Complete' : 'Register Now'}
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {!isConnected ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Box sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  bgcolor: 'rgba(98, 0, 234, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px auto'
                }}>
                  <AccountBalanceWalletIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  Connect Your Wallet
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto', mb: 4 }}>
                  Please connect your wallet to register for the Universal Bet referral system.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={connectWallet}
                  size="large"
                  startIcon={<AccountBalanceWalletIcon />}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Connect Wallet
                </Button>
              </Box>
            ) : success ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Box sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  bgcolor: 'rgba(76, 175, 80, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px auto'
                }}>
                  <CheckCircleIcon sx={{ fontSize: 60, color: theme.palette.success.main }} />
                </Box>
                <Typography variant="h5" gutterBottom color="success.main">
                  Registration Successful!
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto', mb: 4 }}>
                  Your account has been successfully registered on the blockchain. You will be redirected to your dashboard shortly.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/dashboard')}
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Go to Dashboard
                </Button>
              </Box>
            ) : (
              <>
                {error && (
                  <Alert severity="error" sx={{ mb: 4 }}>
                    {error}
                  </Alert>
                )}

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Registration Details
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      Register to participate in the Universal Bet referral system. You can optionally provide a referrer address.
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        YOUR WALLET ADDRESS
                      </Typography>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        bgcolor: 'rgba(0, 0, 0, 0.03)',
                        borderRadius: 2,
                        wordBreak: 'break-all'
                      }}>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                          <PersonIcon />
                        </Avatar>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                          {account}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      All registration data is stored on the blockchain. No database is used.
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Once registered, you can invite others using your referral link.
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Referrer Information
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      Enter the address of the person who referred you (optional).
                    </Typography>

                    <TextField
                      fullWidth
                      label="Referrer Address"
                      variant="outlined"
                      value={referrerAddress}
                      onChange={(e) => setReferrerAddress(e.target.value)}
                      margin="normal"
                      placeholder="0x..."
                      disabled={loading}
                      sx={{
                        mb: 3,
                        '& .MuiInputBase-root': {
                          paddingLeft: 0
                        }
                      }}
                      helperText={
                        referrerAddress
                          ? ethers.utils.isAddress(referrerAddress)
                            ? "Valid address format"
                            : "Invalid address format"
                          : "Leave empty if you don't have a referrer"
                      }
                      error={referrerAddress !== '' && !ethers.utils.isAddress(referrerAddress)}
                      // Using custom icon with sx styling
                      InputProps={{
                        startAdornment: (
                          <Box sx={{ mr: 1, color: 'text.secondary', ml: 1 }}>
                            <LinkIcon />
                          </Box>
                        ),
                      }}
                      // Note: InputProps is deprecated but still works
                    />

                    <Box sx={{ mt: 4 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleRegister}
                        disabled={loading || (referrerAddress !== '' && !ethers.utils.isAddress(referrerAddress))}
                        startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <PersonAddIcon />}
                        fullWidth
                        sx={{ py: 1.5 }}
                      >
                        {loading ? 'Registering...' : 'Complete Registration'}
                      </Button>
                    </Box>
                  </Box>
                </Stack>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;
