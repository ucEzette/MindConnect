import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeMode must be used within ThemeProvider');
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#3B4A7A', // Deep Indigo
            light: '#5A6B9E',
            dark: '#2A3556',
            contrastText: '#FFFFFF',
          },
          secondary: {
            main: '#9B8FEF', // Pastel Lavender
            light: '#C4B9FF',
            dark: '#7565D1',
            contrastText: '#FFFFFF',
          },
          accent: {
            main: '#D4A24A', // Muted Mustard
            light: '#E8BF6E',
            dark: '#B58633',
          },
          success: {
            main: '#4CAF50',
            light: '#81C784',
            dark: '#388E3C',
          },
          warning: {
            main: '#D4A24A', // Using accent color
            light: '#E8BF6E',
            dark: '#B58633',
          },
          error: {
            main: '#E57373',
            light: '#EF9A9A',
            dark: '#D32F2F',
          },
          background: {
            default: mode === 'light' ? '#F2F2F4' : '#1A1D2E', // Warm Gray / Dark
            paper: mode === 'light' ? '#FFFFFF' : '#262B3F',
          },
          text: {
            primary: mode === 'light' ? '#2A2A2E' : '#F2F2F4',
            secondary: mode === 'light' ? '#5A5A5F' : '#B8B8BE',
          },
          divider: mode === 'light' ? '#E0E0E2' : '#3A3F52',
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: 16,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          fontWeightBold: 600,
          h1: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '3.5rem',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          },
          h2: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '2.75rem',
            lineHeight: 1.25,
            letterSpacing: '-0.005em',
          },
          h3: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: '2.25rem',
            lineHeight: 1.3,
            letterSpacing: '0em',
          },
          h4: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: '1.875rem',
            lineHeight: 1.35,
            letterSpacing: '0.01em',
          },
          h5: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.4,
            letterSpacing: '0.01em',
          },
          h6: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.45,
            letterSpacing: '0.01em',
          },
          subtitle1: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.5,
            letterSpacing: '0.01em',
          },
          subtitle2: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: 1.5,
            letterSpacing: '0.01em',
          },
          body1: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: 1.5,
            letterSpacing: '0.01em',
          },
          body2: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 400,
            fontSize: '0.875rem',
            lineHeight: 1.43,
            letterSpacing: '0.01em',
          },
          button: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: '0.875rem',
            lineHeight: 1.75,
            letterSpacing: '0.02em',
            textTransform: 'none',
          },
          caption: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: 1.4,
            letterSpacing: '0.01em',
          },
          overline: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: '0.75rem',
            lineHeight: 2,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                padding: '10px 24px',
                fontWeight: 600,
                letterSpacing: '0.02em',
              },
              containedPrimary: {
                backgroundColor: '#3B4A7A',
                '&:hover': {
                  backgroundColor: '#2A3556',
                },
              },
              containedSecondary: {
                backgroundColor: '#9B8FEF',
                '&:hover': {
                  backgroundColor: '#7565D1',
                },
              },
              outlined: {
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                boxShadow: mode === 'light' 
                  ? '0 4px 12px rgba(59, 74, 122, 0.08)' 
                  : '0 4px 12px rgba(0, 0, 0, 0.3)',
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                fontWeight: 500,
                letterSpacing: '0.01em',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 8,
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
