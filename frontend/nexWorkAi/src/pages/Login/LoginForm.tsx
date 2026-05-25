import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  type SxProps,
  type Theme,
} from '@mui/material';
import { useState } from 'react';
import EmailIcon from '../../assets/EmailIcon';
import { LockIcon } from '../../assets/LockIcon';
import { EyeOffIcon } from '../../assets/EyeOffIcon';
import { EyeIcon } from '../../assets/EyeIcon';
import { useNavigate } from 'react-router-dom';

type Props = {};

const LoginForm = (props: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [emailErr, setEmailErr] = useState<string>('');
  const [passErr, setPassErr] = useState<string>('');
  const navigate = useNavigate();

  const textFieldSx: SxProps<Theme> = {
    '& .MuiOutlinedInput-root': {
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#6366f1',
      },
    },
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    if (email === password) {
      navigate('/');
    }
    // setError('');
    // if (!validate()) return;
    // setLoading(true);
    // // Replace with your real auth call, e.g.:
    // // const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    // setTimeout(() => {
    //   setLoading(false);
    //   setError('Invalid credentials. Try a demo account below.');
    // }, 2000);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      {/* Heading */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ color: 'text.primary', mb: 0.75 }}>
          Welcome back
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Sign in to your workspace
        </Typography>
      </Box>

      {/* Form Starts */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
      >
        {/* Email */}
        <TextField
          label="Work email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailErr('');
          }}
          placeholder="you@company.com"
          error={!!emailErr}
          helperText={emailErr}
          sx={textFieldSx}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Password */}
        <TextField
          label="Password"
          type={showPass ? 'text' : 'password'}
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPassErr('');
          }}
          error={!!passErr}
          helperText={passErr}
          sx={textFieldSx}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPass((v) => !v)}
                    edge="end"
                    size="small"
                  >
                    {showPass ? <EyeOffIcon /> : <EyeIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Remember me + Forgot password */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -0.5,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                size="small"
              />
            }
            label={
              <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                Keep me signed in
              </Typography>
            }
          />
          <Link
            href="#"
            underline="hover"
            sx={{ fontSize: 13, color: 'primary.main', fontWeight: 500 }}
          >
            Forgot password?
          </Link>
        </Box>

        {/* Submit button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          sx={{
            mt: 0.5,
            height: 48,
            borderRadius: '10px',
            background: '#6366f1',
            '&:hover': { background: '#4f46e5' },
            '&.Mui-disabled': { background: '#818cf8', color: '#fff' },
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={16} sx={{ color: '#fff', mr: 1 }} />
              Signing in…
            </>
          ) : (
            'Sign in to workspace'
          )}
        </Button>
      </Box>

      {/* Footer */}
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          color: 'text.disabled',
          textAlign: 'center',
          mt: 4,
          lineHeight: 1.7,
        }}
      >
        By signing in, you agree to our{' '}
        <Link href="#" sx={{ color: 'primary.main', fontSize: 'inherit' }}>
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="#" sx={{ color: 'primary.main', fontSize: 'inherit' }}>
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
