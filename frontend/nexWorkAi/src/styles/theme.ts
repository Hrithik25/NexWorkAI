import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
      dark: '#4f46e5',
      light: '#818cf8',
      contrastText: '#fff',
    },
    success: { main: '#16a34a' },
    warning: { main: '#d97706' },
    background: { default: '#fafafc', paper: '#ffffff' },
    text: { primary: '#0d0d12', secondary: '#6b6c82' },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h5: { fontWeight: 700, letterSpacing: '-0.02em' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, fontSize: 15 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5fb',
          transition: 'background-color 0.18s ease',
          '&.Mui-focused': { backgroundColor: '#fff' },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { '&.Mui-focused': { color: '#6366f1' } },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#c0c0d4',
          '&.Mui-checked': { color: '#6366f1' },
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 500 } },
    },
  },
});
