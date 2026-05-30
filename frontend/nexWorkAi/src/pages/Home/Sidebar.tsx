import { Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: number;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const IconSvg = ({ children }: { children: React.ReactNode }) => (
  <Box component="span" sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  </Box>
);

const Icons = {
  Dashboard:     <IconSvg><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></IconSvg>,
  Employees:     <IconSvg><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></IconSvg>,
  Tasks:         <IconSvg><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></IconSvg>,
  Projects:      <IconSvg><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></IconSvg>,
  Attendance:    <IconSvg><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></IconSvg>,
  Analytics:     <IconSvg><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></IconSvg>,
  AI:            <IconSvg><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1H1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/></IconSvg>,
  Notifications: <IconSvg><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></IconSvg>,
  Departments:   <IconSvg><path d="M3 21h18M9 21V7l6-4v18"/><path d="M9 11h6"/></IconSvg>,
  Settings:      <IconSvg><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></IconSvg>,
};

const NAV_SECTIONS: NavSection[] = [
  {
    label: 'Main',
    items: [
      { icon: Icons.Dashboard,  label: 'Dashboard',  path: '/dashboard' },
      { icon: Icons.Employees,  label: 'Employees',  path: '/employees' },
      { icon: Icons.Tasks,      label: 'Tasks',      path: '/tasks',      badge: 8 },
      { icon: Icons.Projects,   label: 'Projects',   path: '/projects' },
      { icon: Icons.Attendance, label: 'Attendance', path: '/attendance' },
    ],
  },
  {
    label: 'Insights',
    items: [
      { icon: Icons.Analytics,     label: 'Analytics',      path: '/analytics' },
      { icon: Icons.AI,            label: 'AI Assistant',   path: '/ai' },
      { icon: Icons.Notifications, label: 'Notifications',  path: '/notifications', badge: 3 },
    ],
  },
  {
    label: 'Admin',
    items: [
      { icon: Icons.Departments, label: 'Departments', path: '/departments' },
      { icon: Icons.Settings,    label: 'Settings',    path: '/settings' },
    ],
  },
];

interface SidebarProps {
  userName?: string;
  userRole?: string;
  userInitials?: string;
}

const Sidebar = ({
  userName = 'Arjun Kumar',
  userRole = 'Administrator',
  userInitials = 'AK',
}: SidebarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box sx={{
      width: 220,
      flexShrink: 0,
      background: '#0d0d12',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      position: 'relative',
    }}>
      {/* Logo */}
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 1.25,
        p: '18px 18px 14px',
        borderBottom: '0.5px solid rgba(255,255,255,0.07)',
      }}>
        <Box sx={{
          width: 30, height: 30, background: '#6366f1', borderRadius: '7px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
            <rect x="2"  y="2"  width="7" height="7" rx="1.5" fill="white" opacity="0.9"  />
            <rect x="11" y="2"  width="7" height="7" rx="1.5" fill="white" opacity="0.45" />
            <rect x="2"  y="11" width="7" height="7" rx="1.5" fill="white" opacity="0.45" />
            <rect x="11" y="11" width="7" height="7" rx="1.5" fill="white" opacity="0.9"  />
          </svg>
        </Box>
        <Typography sx={{ color: '#f0f0f5', fontWeight: 600, fontSize: 13, letterSpacing: '0.01em', lineHeight: 1.3 }}>
          Smart Workforce<br />Hub
        </Typography>
      </Box>

      {/* Nav sections */}
      {NAV_SECTIONS.map((section) => (
        <Box key={section.label} sx={{ px: 1.25, pt: 1.75, pb: 0.5 }}>
          <Typography sx={{
            fontSize: 10, color: 'rgba(255,255,255,0.28)',
            textTransform: 'uppercase', letterSpacing: '0.1em',
            px: 1, mb: 0.5,
          }}>
            {section.label}
          </Typography>
          {section.items.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
            return (
              <Box
                key={item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.1,
                  px: 1, py: 0.9,
                  borderRadius: '7px',
                  cursor: 'pointer',
                  mb: '1px',
                  color: isActive ? '#a5b4fc' : 'rgba(255,255,255,0.45)',
                  background: isActive ? 'rgba(99,102,241,0.18)' : 'transparent',
                  fontSize: 13,
                  transition: 'all 0.15s',
                  '&:hover': !isActive ? {
                    background: 'rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.8)',
                  } : {},
                }}
              >
                {item.icon}
                <Typography sx={{ fontSize: 13, fontWeight: isActive ? 500 : 400, color: 'inherit', flex: 1 }}>
                  {item.label}
                </Typography>
                {item.badge !== undefined && (
                  <Box sx={{
                    background: '#6366f1', color: '#fff',
                    fontSize: 10, px: '6px', py: '1px',
                    borderRadius: '99px', lineHeight: 1.6,
                  }}>
                    {item.badge}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      ))}

      {/* User footer */}
      <Box sx={{ mt: 'auto', px: 1.25, py: 1.5, borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1.1,
          px: 1, py: 0.875,
          borderRadius: '7px', cursor: 'pointer',
          '&:hover': { background: 'rgba(255,255,255,0.05)' },
        }}>
          <Box sx={{
            width: 30, height: 30, borderRadius: '50%',
            background: '#6366f1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 500, color: '#fff', flexShrink: 0,
          }}>
            {userInitials}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ color: '#f0f0f5', fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {userName}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>
              {userRole}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
