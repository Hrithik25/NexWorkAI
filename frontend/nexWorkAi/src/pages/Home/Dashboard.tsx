import { Box, Typography, Chip } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

// ── Types ────────────────────────────────────────────────────────────────────

interface KpiCard {
  label: string;
  value: string;
  change: string;
  changeType: 'up' | 'down' | 'neutral';
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
}

interface ActivityItem {
  id: number;
  text: React.ReactNode;
  time: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
}

interface TaskItem {
  id: number;
  name: string;
  meta: string;
  done: boolean;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
}

// ── Inline SVG icons ─────────────────────────────────────────────────────────

const Ico = ({ children, color = 'currentColor' }: { children: React.ReactNode; color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

// ── Data ─────────────────────────────────────────────────────────────────────

const ATTENDANCE_DATA = [
  { day: 'Mon', present: 921, absent: 363 },
  { day: 'Tue', present: 958, absent: 326 },
  { day: 'Wed', present: 943, absent: 341 },
  { day: 'Thu', present: 909, absent: 375 },
  { day: 'Fri', present: 947, absent: 337 },
];

const DEPT_DATA = [
  { name: 'Engineering', value: 398, color: '#6366f1' },
  { name: 'Sales',       value: 282, color: '#06b6d4' },
  { name: 'Design',      value: 193, color: '#8b5cf6' },
  { name: 'HR',          value: 180, color: '#f59e0b' },
  { name: 'Other',       value: 231, color: '#d1d5db' },
];

const KPI_CARDS: KpiCard[] = [
  {
    label: 'Total employees',
    value: '1,284',
    change: '+12 this month',
    changeType: 'up',
    iconBg: '#eef0ff',
    iconColor: '#6366f1',
    icon: <Ico color="#6366f1"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></Ico>,
  },
  {
    label: 'Active today',
    value: '947',
    change: '73.7% attendance',
    changeType: 'up',
    iconBg: '#f0fdf4',
    iconColor: '#16a34a',
    icon: <Ico color="#16a34a"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></Ico>,
  },
  {
    label: 'Tasks completed',
    value: '382',
    change: '+28 vs last week',
    changeType: 'up',
    iconBg: '#fff7ed',
    iconColor: '#d97706',
    icon: <Ico color="#d97706"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Ico>,
  },
  {
    label: 'Departments',
    value: '14',
    change: 'No change',
    changeType: 'neutral',
    iconBg: '#fdf4ff',
    iconColor: '#a855f7',
    icon: <Ico color="#a855f7"><path d="M3 21h18M9 21V7l6-4v18"/><path d="M9 11h6"/></Ico>,
  },
];

const ACTIVITY: ActivityItem[] = [
  {
    id: 1,
    text: <><b style={{ fontWeight: 500 }}>Priya Sharma</b> was onboarded to Engineering</>,
    time: '2 minutes ago',
    iconBg: '#eef0ff', iconColor: '#6366f1',
    icon: <Ico color="#6366f1"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></Ico>,
  },
  {
    id: 2,
    text: <><b style={{ fontWeight: 500 }}>Q2 Roadmap Review</b> task marked complete</>,
    time: '18 minutes ago',
    iconBg: '#f0fdf4', iconColor: '#16a34a',
    icon: <Ico color="#16a34a"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Ico>,
  },
  {
    id: 3,
    text: <><b style={{ fontWeight: 500 }}>Rahul Mehta</b> submitted a leave request</>,
    time: '1 hour ago',
    iconBg: '#fff7ed', iconColor: '#d97706',
    icon: <Ico color="#d97706"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Ico>,
  },
  {
    id: 4,
    text: <><b style={{ fontWeight: 500 }}>Design</b> department budget updated</>,
    time: '3 hours ago',
    iconBg: '#fdf4ff', iconColor: '#a855f7',
    icon: <Ico color="#a855f7"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></Ico>,
  },
  {
    id: 5,
    text: <><b style={{ fontWeight: 500 }}>API Integration sprint</b> deadline approaching</>,
    time: '5 hours ago',
    iconBg: '#fef2f2', iconColor: '#dc2626',
    icon: <Ico color="#dc2626"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></Ico>,
  },
];

const TASKS: TaskItem[] = [
  { id: 1, name: 'Review Q2 performance reports',     meta: 'HR · completed',    done: true,  priority: 'Low'      },
  { id: 2, name: 'Approve 3 pending leave requests',  meta: 'HR · due today',    done: false, priority: 'Critical' },
  { id: 3, name: 'Finalize onboarding for new hires', meta: 'Operations · due tomorrow', done: false, priority: 'High' },
  { id: 4, name: 'Update employee skill tags',        meta: 'Engineering · completed',   done: true,  priority: 'Medium' },
  { id: 5, name: 'Prepare monthly headcount report',  meta: 'Analytics · due May 31',    done: false, priority: 'High' },
  { id: 6, name: 'Schedule 1:1s with department leads', meta: 'Management · due Jun 2', done: false, priority: 'Medium' },
];

// ── Priority chip styles ──────────────────────────────────────────────────────

const PRIORITY_SX: Record<TaskItem['priority'], object> = {
  Critical: { background: '#fef2f2', color: '#b91c1c', border: '0.5px solid #fecaca' },
  High:     { background: '#fff7ed', color: '#c2410c', border: '0.5px solid #fed7aa' },
  Medium:   { background: '#fefce8', color: '#a16207', border: '0.5px solid #fef08a' },
  Low:      { background: '#f0fdf4', color: '#15803d', border: '0.5px solid #bbf7d0' },
};

// ── Sub-components ────────────────────────────────────────────────────────────

function CardShell({ children, sx = {} }: { children: React.ReactNode; sx?: object }) {
  return (
    <Box sx={{
      background: 'background.paper',
      bgcolor: '#fff',
      border: '0.5px solid',
      borderColor: 'divider',
      borderRadius: '12px',
      ...sx,
    }}>
      {children}
    </Box>
  );
}

function SectionHeader({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
      <Box>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'text.primary' }}>{title}</Typography>
        {sub && <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.25 }}>{sub}</Typography>}
      </Box>
      {action}
    </Box>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const Dashboard = () => {
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());

  const changeColor: Record<KpiCard['changeType'], string> = {
    up: '#16a34a', down: '#dc2626', neutral: '#6b7280',
  };

  return (
    <Box sx={{ flex: 1, overflowY: 'auto', p: 3, background: '#f5f5fb', minHeight: '100vh' }}>

      {/* Page heading */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: 'text.primary', letterSpacing: '-0.02em' }}>
          Good morning, Arjun 👋
        </Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 0.25 }}>{today}</Typography>
      </Box>

      {/* KPI cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', mb: '20px' }}>
        {KPI_CARDS.map((card) => (
          <CardShell key={card.label} sx={{ p: '16px 18px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{card.label}</Typography>
              <Box sx={{ width: 32, height: 32, borderRadius: '8px', background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {card.icon}
              </Box>
            </Box>
            <Typography sx={{ fontSize: 24, fontWeight: 500, color: 'text.primary', lineHeight: 1, mb: 0.75 }}>
              {card.value}
            </Typography>
            <Typography sx={{ fontSize: 12, color: changeColor[card.changeType] }}>
              {card.change}
            </Typography>
          </CardShell>
        ))}
      </Box>

      {/* Charts row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '14px', mb: '20px' }}>

        {/* Attendance bar chart */}
        <CardShell sx={{ p: '18px 20px' }}>
          <SectionHeader title="Weekly attendance" sub="Check-ins per day this week" />

          {/* Legend */}
          <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
            {[
              { label: 'Present', color: '#6366f1' },
              { label: 'Absent',  color: '#e0e7ff' },
            ].map((l) => (
              <Box key={l.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '2px', background: l.color }} />
                <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{l.label}</Typography>
              </Box>
            ))}
          </Box>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ATTENDANCE_DATA} barSize={22} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`} domain={[0, 1400]} />
              <Tooltip
                contentStyle={{ border: '0.5px solid #e5e7eb', borderRadius: 8, fontSize: 12 }}
                formatter={(v: number, name: string) => [v.toLocaleString(), name]}
              />
              <Bar dataKey="present" fill="#6366f1" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="absent"  fill="#e0e7ff" radius={[4, 4, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </CardShell>

        {/* Department pie chart */}
        <CardShell sx={{ p: '18px 20px' }}>
          <SectionHeader title="By department" sub="Headcount breakdown" />
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={DEPT_DATA}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {DEPT_DATA.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ border: '0.5px solid #e5e7eb', borderRadius: 8, fontSize: 12 }}
                formatter={(v: number, name: string) => [v.toLocaleString(), name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
            {DEPT_DATA.map((d) => (
              <Box key={d.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{d.name}</Typography>
                </Box>
                <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'text.primary' }}>{d.value}</Typography>
              </Box>
            ))}
          </Box>
        </CardShell>
      </Box>

      {/* Bottom row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

        {/* Activity feed */}
        <CardShell sx={{ p: '18px 20px' }}>
          <SectionHeader
            title="Recent activity"
            sub="Live audit trail"
            action={<Typography sx={{ fontSize: 12, color: '#6366f1', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>View all</Typography>}
          />
          <Box>
            {ACTIVITY.map((item, idx) => (
              <Box key={item.id} sx={{
                display: 'flex', alignItems: 'flex-start', gap: 1.5,
                py: 1.25,
                borderBottom: idx < ACTIVITY.length - 1 ? '0.5px solid' : 'none',
                borderColor: 'divider',
              }}>
                <Box sx={{
                  width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                  background: item.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '1px',
                }}>
                  {item.icon}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: 13, color: 'text.primary', lineHeight: 1.45 }}>
                    {item.text}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 0.25 }}>{item.time}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </CardShell>

        {/* Task list */}
        <CardShell sx={{ p: '18px 20px' }}>
          <SectionHeader
            title="My tasks"
            sub="8 pending · 3 completed"
            action={<Typography sx={{ fontSize: 12, color: '#6366f1', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Open board</Typography>}
          />
          <Box>
            {TASKS.map((task, idx) => (
              <Box key={task.id} sx={{
                display: 'flex', alignItems: 'center', gap: 1.25,
                py: 1.1,
                borderBottom: idx < TASKS.length - 1 ? '0.5px solid' : 'none',
                borderColor: 'divider',
              }}>
                {/* Checkbox */}
                <Box sx={{
                  width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                  border: task.done ? 'none' : '1.5px solid',
                  borderColor: 'divider',
                  background: task.done ? '#6366f1' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {task.done && (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </Box>

                {/* Info */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{
                    fontSize: 13, color: task.done ? 'text.secondary' : 'text.primary',
                    textDecoration: task.done ? 'line-through' : 'none',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {task.name}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 0.25 }}>{task.meta}</Typography>
                </Box>

                {/* Priority badge */}
                <Chip
                  label={task.priority}
                  size="small"
                  sx={{
                    fontSize: 11, height: 20, flexShrink: 0,
                    borderRadius: '99px',
                    fontWeight: 500,
                    ...PRIORITY_SX[task.priority],
                  }}
                />
              </Box>
            ))}
          </Box>
        </CardShell>

      </Box>
    </Box>
  );
};

export default Dashboard;
