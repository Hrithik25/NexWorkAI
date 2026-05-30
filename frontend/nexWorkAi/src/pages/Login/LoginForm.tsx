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
import { useLogin } from '../../hooks/useAuth';
import { STRINGS } from '../../constants/strings';

const LoginForm = () => {
  const login = useLogin();
  const labels = STRINGS.AUTH;

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);

  const [emailErr, setEmailErr] = useState<string>('');
  const [passErr, setPassErr] = useState<string>('');

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
    // if (!validate()) return

    login.mutate({ email, password });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      {/* Heading */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ color: 'text.primary', mb: 0.75 }}>
          {labels.loginTitle}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {labels.loginSubtitle}
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
          label={labels.emailLabel}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailErr('');
          }}
          placeholder={labels.emailPlaceholder}
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
          label={labels.passwordLabel}
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
                {labels.keepSignedIn}
              </Typography>
            }
          />
          <Link
            href="#"
            underline="hover"
            sx={{ fontSize: 13, color: 'primary.main', fontWeight: 500 }}
          >
            {labels.forgotPassword}
          </Link>
        </Box>

        {/* Submit button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={login.isPending}
          sx={{
            mt: 0.5,
            height: 48,
            borderRadius: '10px',
            background: '#6366f1',
            '&:hover': { background: '#4f46e5' },
            '&.Mui-disabled': { background: '#818cf8', color: '#fff' },
          }}
        >
          {login.isPending ? (
            <>
              <CircularProgress size={16} sx={{ color: '#fff', mr: 1 }} />
              {labels.signingIn}
            </>
          ) : (
            labels.loginButton
          )}
        </Button>

        {/* New User Signup */}
        {/* <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -0.5,
          }}
        >
          <Typography>New User? </Typography>
          <Link
            href="#"
            underline="hover"
            sx={{ fontSize: 13, color: 'primary.main', fontWeight: 500 }}
          >
            Sign Up
          </Link>
        </Box> */}
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
