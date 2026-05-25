import { Box, Chip, Typography } from '@mui/material';

type Stat = {
  value: string;
  label: string;
};

const BrandPanel = () => {
  const STATS: Stat[] = [
    { value: '12,400+', label: 'Employees managed' },
    { value: '340+', label: 'Enterprise clients' },
    { value: '99.9%', label: 'Uptime SLA' },
  ];

  return (
    <Box
      sx={{
        flex: '0 0 42%',
        background: '#0d0d12',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        p: 5,
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      {/* Dot-grid background */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'radial-gradient(circle, rgba(99,102,241,0.28) 1.2px, transparent 1.2px)',
          backgroundSize: '26px 26px',
          opacity: 0.55,
        }}
      />

      {/* Left glow blob */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          left: -110,
          top: '28%',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 68%)',
        }}
      />

      {/* Bottom-right corner accent */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          right: -60,
          bottom: -60,
          width: 240,
          height: 240,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(129,140,248,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            background: '#6366f1',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
          >
            <rect
              x="2"
              y="2"
              width="7"
              height="7"
              rx="1.5"
              fill="white"
              opacity="0.9"
            />
            <rect
              x="11"
              y="2"
              width="7"
              height="7"
              rx="1.5"
              fill="white"
              opacity="0.45"
            />
            <rect
              x="2"
              y="11"
              width="7"
              height="7"
              rx="1.5"
              fill="white"
              opacity="0.45"
            />
            <rect
              x="11"
              y="11"
              width="7"
              height="7"
              rx="1.5"
              fill="white"
              opacity="0.9"
            />
          </svg>
        </Box>
        <Typography
          sx={{
            color: '#f0f0f5',
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: '0.01em',
          }}
        >
          Smart Workforce Hub
        </Typography>
      </Box>

      {/* Headline block — pushed to vertical centre via mt: auto */}
      <Box sx={{ position: 'relative', mt: 'auto', mb: 5 }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 'clamp(26px, 2.8vw, 40px)',
            lineHeight: 1.1,
            color: '#f0f0f5',
            letterSpacing: '-0.025em',
            mb: 2,
          }}
        >
          Your people,{' '}
          <Box
            component="span"
            sx={{ color: '#818cf8', fontWeight: 300, fontStyle: 'italic' }}
          >
            unified.
          </Box>
        </Typography>

        <Typography
          sx={{
            color: 'rgba(240,240,245,0.42)',
            fontSize: 14,
            lineHeight: 1.75,
            maxWidth: 310,
            fontWeight: 300,
          }}
        >
          Enterprise HR, task management, and AI-powered insights — all in one
          seamless workspace.
        </Typography>

        {/* Stats row */}
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            mt: 4,
            pt: 3,
            borderTop: '0.5px solid rgba(99,102,241,0.22)',
          }}
        >
          {STATS.map((s) => (
            <Box key={s.label}>
              <Typography
                sx={{
                  color: '#a5b4fc',
                  fontWeight: 700,
                  fontSize: 21,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(240,240,245,0.35)',
                  fontSize: 10.5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  mt: 0.5,
                  fontWeight: 500,
                }}
              >
                {s.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Status badge */}
      <Box sx={{ position: 'relative' }}>
        <Chip
          icon={
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#4ade80',
                ml: '10px !important',
                flexShrink: 0,
              }}
            />
          }
          label="All systems operational"
          size="small"
          sx={{
            background: 'rgba(99,102,241,0.1)',
            border: '0.5px solid rgba(99,102,241,0.28)',
            color: 'rgba(240,240,245,0.5)',
            fontSize: 11,
            height: 28,
            '& .MuiChip-icon': { color: 'transparent', mr: 0 },
          }}
        />
      </Box>
    </Box>
  );
};

export default BrandPanel;
