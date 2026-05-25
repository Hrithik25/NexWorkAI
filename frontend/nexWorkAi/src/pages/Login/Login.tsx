import { Box, Typography } from '@mui/material';
import BrandPanel from './BrandPanel';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <BrandPanel />

      {/* Right panel */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fafafc',
          p: { xs: 3, sm: 5 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle corner glow */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            pointerEvents: 'none',
            width: 280,
            height: 280,
            background:
              'radial-gradient(circle at top right, rgba(99,102,241,0.07) 0%, transparent 70%)',
          }}
        />
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
