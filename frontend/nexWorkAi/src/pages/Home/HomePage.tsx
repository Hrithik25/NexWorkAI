import { useState } from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

// ── Inline SVG icons ──────────────────────────────────────────────────────────

const Ico = ({ children }: { children: React.ReactNode }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const SearchIcon = () => (
  <Ico>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Ico>
);
const BellIcon = () => (
  <Ico>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </Ico>
);
const HelpIcon = () => (
  <Ico>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </Ico>
);

// ── Topbar ────────────────────────────────────────────────────────────────────

interface TopbarProps {
  userInitials?: string;
}

function Topbar({ userInitials = 'AK' }: TopbarProps) {
  const [search, setSearch] = useState('');

  const iconBtnSx = {
    width: 32,
    height: 32,
    border: '0.5px solid',
    borderColor: 'divider',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'text.secondary',
    cursor: 'pointer',
    flexShrink: 0,
    '&:hover': { bgcolor: 'action.hover' },
  };

  return (
    <Box
      component="header"
      sx={{
        height: 56,
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderBottom: '0.5px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        px: 3,
        gap: 2,
      }}
    >
      {/* Global search */}
      <TextField
        size="small"
        placeholder="Search employees, tasks… (⌘K)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          ml: 'auto',
          width: 240,
          '& .MuiOutlinedInput-root': {
            fontSize: 13,
            borderRadius: '8px',
            bgcolor: 'action.hover',
            '& fieldset': { borderColor: 'divider' },
            '&:hover fieldset': { borderColor: '#6366f1' },
            '&.Mui-focused fieldset': { borderColor: '#6366f1' },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Notifications */}
      <Box
        sx={{ ...iconBtnSx, position: 'relative' }}
        role="button"
        aria-label="Notifications"
      >
        <Box sx={{ color: 'text.secondary' }}>
          <BellIcon />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 6,
            right: 6,
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#6366f1',
            border: '1.5px solid',
            borderColor: 'background.paper',
          }}
        />
      </Box>

      {/* Help */}
      <Box sx={iconBtnSx} role="button" aria-label="Help">
        <Box sx={{ color: 'text.secondary' }}>
          <HelpIcon />
        </Box>
      </Box>

      {/* Avatar */}
      <Box
        role="button"
        aria-label="Account menu"
        sx={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: '#6366f1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 500,
          color: '#fff',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        {userInitials}
      </Box>
    </Box>
  );
}

// ── HomePage layout shell ─────────────────────────────────────────────────────

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />

      {/* Right column: topbar + routed content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Topbar />
        {/*
          <Outlet /> renders the currently matched child route.
          e.g. /dashboard → <Dashboard />, /employees → <Employees />, etc.
          If you're not using nested routes, replace <Outlet /> with <Dashboard /> directly.
        */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default HomePage;
