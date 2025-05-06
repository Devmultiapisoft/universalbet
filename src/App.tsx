
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { WalletProvider } from './context/WalletContext';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Pool from './pages/Pool';
import MultiPools from './pages/MultiPools';
import PoolReports from './pages/PoolReports';

// Create a colorful theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea', // Deep purple
      light: '#9d46ff',
      dark: '#0a00b6',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00bcd4', // Cyan
      light: '#62efff',
      dark: '#008ba3',
      contrastText: '#000000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '10px 24px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: '0 6px 15px rgba(98, 0, 234, 0.3)',
          },
        },
        containedSecondary: {
          '&:hover': {
            boxShadow: '0 6px 15px rgba(0, 188, 212, 0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        },
        elevation3: {
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WalletProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/pool" element={<Pool />} />
            <Route path="/pools" element={<MultiPools />} />
            <Route path="/reports" element={<PoolReports />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;
