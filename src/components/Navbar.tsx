import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Chip,
  Tooltip,
  Container,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import CasinoIcon from '@mui/icons-material/Casino';
import AssessmentIcon from '@mui/icons-material/Assessment';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Navbar: React.FC = () => {
  const {
    account,
    isConnected,
    connectWallet,
    disconnectWallet,
    loading,
    isRegistered,
    isCorrectNetwork,
    switchToCorrectNetwork
  } = useWallet();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Reports dropdown menu state
  const [reportsMenuAnchor, setReportsMenuAnchor] = useState<null | HTMLElement>(null);
  const isReportsMenuOpen = Boolean(reportsMenuAnchor);

  const handleReportsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setReportsMenuAnchor(event.currentTarget);
  };

  const handleReportsMenuClose = () => {
    setReportsMenuAnchor(null);
  };

  const handleReportSelect = (poolType: string) => {
    navigate('/reports', { state: { selectedPool: poolType } });
    handleReportsMenuClose();
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Gradient background for AppBar
  const appBarStyle = {
    background: 'linear-gradient(90deg, #6200ea 0%, #3f51b5 100%)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  };

  // Mobile drawer content
  const mobileDrawerContent = (
    <Box sx={{ width: 250, pt: 2 }} role="presentation">
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" component={RouterLink} to="/"
          sx={{
            color: theme.palette.primary.main,
            textDecoration: 'none',
            fontWeight: 700,
            mb: 1
          }}
        >
          Universal Bet
        </Typography>

        {isConnected && (
          <Chip
            avatar={<Avatar sx={{ bgcolor: isRegistered ? theme.palette.success.main : theme.palette.grey[500] }}>W</Avatar>}
            label={`${account?.substring(0, 6)}...${account?.substring(account.length - 4)}`}
            color={isRegistered ? "success" : "default"}
            variant="outlined"
            sx={{ my: 1 }}
          />
        )}
      </Box>

      <Divider />

      <List>
        <ListItem
          component={RouterLink}
          to="/"
          onClick={closeMobileMenu}
          sx={{
            bgcolor: isActive('/') ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
          }}
        >
          <ListItemIcon>
            <HomeIcon color={isActive('/') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        {isConnected && (
          <>
            {isRegistered ? (
              <ListItem
                component={RouterLink}
                to="/dashboard"
                onClick={closeMobileMenu}
                sx={{
                  bgcolor: isActive('/dashboard') ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                }}
              >
                <ListItemIcon>
                  <DashboardIcon color={isActive('/dashboard') ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            ) : (
              <ListItem
                component={RouterLink}
                to="/register"
                onClick={closeMobileMenu}
                sx={{
                  bgcolor: isActive('/register') ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                }}
              >
                <ListItemIcon>
                  <PersonAddIcon color={isActive('/register') ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItem>
            )}

            {/* <ListItem
              component={RouterLink}
              to="/pool"
              onClick={closeMobileMenu}
              sx={{
                bgcolor: isActive('/pool') ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
              }}
            >
              <ListItemIcon>
                <CasinoIcon color={isActive('/pool') ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="$1 Pool" />
            </ListItem> */}

            <ListItem
              component={RouterLink}
              to="/pools"
              onClick={closeMobileMenu}
              sx={{
                bgcolor: isActive('/pools') ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
              }}
            >
              <ListItemIcon>
                <CasinoIcon color={isActive('/pools') ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="All Pools" />
            </ListItem>

            <ListItem
              component={RouterLink}
              to="/reports"
              onClick={closeMobileMenu}
              sx={{
                bgcolor: isActive('/reports') ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
              }}
            >
              <ListItemIcon>
                <AssessmentIcon color={isActive('/reports') ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
          </>
        )}
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
        {isConnected ? (
          <>
            {!isCorrectNetwork && (
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={switchToCorrectNetwork}
                sx={{ mb: 2 }}
                startIcon={<AccountBalanceWalletIcon />}
              >
                Switch Network
              </Button>
            )}
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => {
                disconnectWallet();
                closeMobileMenu();
              }}
              startIcon={<LogoutIcon />}
            >
              Disconnect
            </Button>
          </>
        ) : (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              connectWallet();
              closeMobileMenu();
            }}
            disabled={loading}
            startIcon={<AccountBalanceWalletIcon />}
          >
            {loading ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={appBarStyle} elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Logo */}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                textDecoration: 'none',
                color: 'white',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Box
                component="span"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  mr: 1
                }}
              >
                UB
              </Box>
              {!isMobile && 'Universal Bet'}
            </Typography>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/"
                  sx={{
                    borderRadius: '20px',
                    px: 2,
                    backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.15)' : 'transparent'
                  }}
                  startIcon={<HomeIcon />}
                >
                  Home
                </Button>

                {isConnected && (
                  <>
                    {isRegistered ? (
                      <Button
                        color="inherit"
                        component={RouterLink}
                        to="/dashboard"
                        sx={{
                          borderRadius: '20px',
                          px: 2,
                          backgroundColor: isActive('/dashboard') ? 'rgba(255, 255, 255, 0.15)' : 'transparent'
                        }}
                        startIcon={<DashboardIcon />}
                      >
                        Dashboard
                      </Button>
                    ) : (
                      <Button
                        color="inherit"
                        component={RouterLink}
                        to="/register"
                        sx={{
                          borderRadius: '20px',
                          px: 2,
                          backgroundColor: isActive('/register') ? 'rgba(255, 255, 255, 0.15)' : 'transparent'
                        }}
                        startIcon={<PersonAddIcon />}
                      >
                        Register
                      </Button>
                    )}



                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/pools"
                      sx={{
                        borderRadius: '20px',
                        px: 2,
                        backgroundColor: isActive('/pools') ? 'rgba(255, 255, 255, 0.15)' : 'transparent'
                      }}
                      startIcon={<CasinoIcon />}
                    >
                      All Pools
                    </Button>

                    <Button
                      color="inherit"
                      aria-controls={isReportsMenuOpen ? 'reports-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={isReportsMenuOpen ? 'true' : undefined}
                      onClick={handleReportsMenuOpen}
                      sx={{
                        borderRadius: '20px',
                        px: 2,
                        backgroundColor: isActive('/reports') ? 'rgba(255, 255, 255, 0.15)' : 'transparent'
                      }}
                      startIcon={<AssessmentIcon />}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      Reports
                    </Button>

                    <Menu
                      id="reports-menu"
                      anchorEl={reportsMenuAnchor}
                      open={isReportsMenuOpen}
                      onClose={handleReportsMenuClose}
                      MenuListProps={{
                        'aria-labelledby': 'reports-button',
                      }}
                    >
                      <MenuItem onClick={() => handleReportSelect('POOL_1_DOLLAR')}>
                        Raffle 1 ($1 Pool)
                      </MenuItem>
                      <MenuItem onClick={() => handleReportSelect('POOL_2_DOLLAR')}>
                        Raffle 2 ($10 Pool)
                      </MenuItem>
                      <MenuItem onClick={() => handleReportSelect('POOL_5_DOLLAR')}>
                        Raffle 3 ($100 Pool)
                      </MenuItem>
                      <MenuItem onClick={() => handleReportSelect('POOL_10_DOLLAR')}>
                        Raffle 4 ($1,000 Pool)
                      </MenuItem>
                      <MenuItem onClick={() => handleReportSelect('POOL_20_DOLLAR')}>
                        Raffle 5 ($10,000 Pool)
                      </MenuItem>
                      <MenuItem onClick={() => handleReportSelect('POOL_50_DOLLAR')}>
                        Raffle 6 ($100,000 Pool)
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </Box>
            )}

            {/* Wallet Connection */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2 }}>
              {isConnected && !isMobile && (
                <>
                  {!isCorrectNetwork && (
                    <Tooltip title="Click to switch to the correct network">
                      <Chip
                        label="Wrong Network"
                        color="error"
                        variant="outlined"
                        onClick={switchToCorrectNetwork}
                        clickable
                        sx={{
                          borderColor: 'white',
                          color: 'white',
                          '& .MuiChip-label': { px: 1 },
                          backgroundColor: 'rgba(244, 67, 54, 0.2)'
                        }}
                      />
                    </Tooltip>
                  )}
                  <Chip
                    avatar={<Avatar sx={{ bgcolor: isRegistered ? theme.palette.success.main : theme.palette.grey[500] }}>W</Avatar>}
                    label={`${account?.substring(0, 6)}...${account?.substring(account.length - 4)}`}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '& .MuiChip-label': { px: 1 }
                    }}
                    variant="outlined"
                  />
                </>
              )}

              {!isMobile && (
                isConnected ? (
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={disconnectWallet}
                    sx={{
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                    }}
                    startIcon={<LogoutIcon />}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={connectWallet}
                    disabled={loading}
                    sx={{
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                    }}
                    startIcon={<AccountBalanceWalletIcon />}
                  >
                    {loading ? 'Connecting...' : 'Connect Wallet'}
                  </Button>
                )
              )}

              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMobileMenuToggle}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
      >
        {mobileDrawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
