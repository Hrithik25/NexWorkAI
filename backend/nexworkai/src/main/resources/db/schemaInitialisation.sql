-- =========================================
-- ROLES TABLE DUMMY DATA
-- =========================================

INSERT INTO roles (id, name, description)
VALUES
    (uuid_generate_v4(), 'ADMIN', 'System Administrator'),
    (uuid_generate_v4(), 'MANAGER', 'Department Manager'),
    (uuid_generate_v4(), 'EMPLOYEE', 'Regular Employee'),
    (uuid_generate_v4(), 'HR', 'Human Resources'),
    (uuid_generate_v4(), 'TEAM_LEAD', 'Technical Team Lead')
ON CONFLICT (name) DO NOTHING;



-- =========================================
-- USERS TABLE DUMMY DATA
-- =========================================

INSERT INTO users (
    id,
    email,
    password,
    first_name,
    last_name,
    phone,
    profile_image_url,
    is_active,
    is_email_verified,
    last_login
)
VALUES
    (
        uuid_generate_v4(),
        'admin@smartworkforce.com',
        '$2a$10$hashedpassword1',
        'Rahul',
        'Sharma',
        '9876543210',
        'https://example.com/profiles/admin.jpg',
        TRUE,
        TRUE,
        CURRENT_TIMESTAMP
    ),
    (
        uuid_generate_v4(),
        'manager@smartworkforce.com',
        '$2a$10$hashedpassword2',
        'Priya',
        'Mehta',
        '9876543211',
        'https://example.com/profiles/manager.jpg',
        TRUE,
        TRUE,
        CURRENT_TIMESTAMP
    ),
    (
        uuid_generate_v4(),
        'employee1@smartworkforce.com',
        '$2a$10$hashedpassword3',
        'Amit',
        'Kumar',
        '9876543212',
        'https://example.com/profiles/employee1.jpg',
        TRUE,
        TRUE,
        CURRENT_TIMESTAMP
    ),
    (
        uuid_generate_v4(),
        'employee2@smartworkforce.com',
        '$2a$10$hashedpassword4',
        'Sneha',
        'Verma',
        '9876543213',
        'https://example.com/profiles/employee2.jpg',
        TRUE,
        FALSE,
        CURRENT_TIMESTAMP
    ),
    (
        uuid_generate_v4(),
        'hr@smartworkforce.com',
        '$2a$10$hashedpassword5',
        'Neha',
        'Singh',
        '9876543214',
        'https://example.com/profiles/hr.jpg',
        TRUE,
        TRUE,
        CURRENT_TIMESTAMP
    )
ON CONFLICT (email) DO NOTHING;



-- =========================================
-- USER ROLES TABLE DUMMY DATA
-- =========================================
-- Mapping users to roles

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.email = 'admin@smartworkforce.com'
  AND r.name = 'ADMIN'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.email = 'manager@smartworkforce.com'
  AND r.name = 'MANAGER'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.email = 'employee1@smartworkforce.com'
  AND r.name = 'EMPLOYEE'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.email = 'employee2@smartworkforce.com'
  AND r.name = 'EMPLOYEE'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.email = 'hr@smartworkforce.com'
  AND r.name = 'HR'
ON CONFLICT DO NOTHING;



-- =========================================
-- REFRESH TOKENS TABLE DUMMY DATA
-- =========================================

INSERT INTO refresh_tokens (
    id,
    user_id,
    token,
    expiry_date,
    revoked
)
SELECT
    uuid_generate_v4(),
    id,
    CONCAT('refresh_token_', SUBSTRING(email, 1, 5)),
    CURRENT_TIMESTAMP + INTERVAL '30 days',
    FALSE
FROM users
LIMIT 5
ON CONFLICT DO NOTHING;

```sql id="4yquj9"
-- =========================================
-- DEPARTMENTS TABLE DUMMY DATA
-- =========================================

INSERT INTO departments (
    id,
    name,
    code,
    description
)
VALUES
    (
        uuid_generate_v4(),
        'Engineering',
        'ENG',
        'Software development and engineering department'
    ),
    (
        uuid_generate_v4(),
        'Human Resources',
        'HR',
        'Employee management and hiring'
    ),
    (
        uuid_generate_v4(),
        'Finance',
        'FIN',
        'Financial operations and accounting'
    ),
    (
        uuid_generate_v4(),
        'Marketing',
        'MKT',
        'Branding and marketing department'
    ),
    (
        uuid_generate_v4(),
        'Operations',
        'OPS',
        'Business operations management'
    )
ON CONFLICT (code) DO NOTHING;



-- =========================================
-- EMPLOYEES TABLE DUMMY DATA
-- =========================================

INSERT INTO employees (
    id,
    user_id,
    employee_code,
    designation,
    department_id,
    joining_date,
    experience_years,
    salary,
    employment_type,
    status,
    city,
    state,
    country,
    bio
)
SELECT
    uuid_generate_v4(),
    u.id,
    CONCAT('EMP-', ROW_NUMBER() OVER()),
    CASE
        WHEN u.email = 'admin@smartworkforce.com' THEN 'CTO'
        WHEN u.email = 'manager@smartworkforce.com' THEN 'Engineering Manager'
        WHEN u.email = 'employee1@smartworkforce.com' THEN 'Frontend Developer'
        WHEN u.email = 'employee2@smartworkforce.com' THEN 'Backend Developer'
        ELSE 'HR Executive'
        END,
    d.id,
    CURRENT_DATE - INTERVAL '2 years',
    3.5,
    85000,
    'FULL_TIME',
    'ACTIVE',
    'Bangalore',
    'Karnataka',
    'India',
    'Experienced enterprise professional'
FROM users u
         CROSS JOIN LATERAL (
    SELECT id
    FROM departments
    ORDER BY RANDOM()
    LIMIT 1
    ) d
ON CONFLICT (employee_code) DO NOTHING;



-- =========================================
-- SKILLS TABLE DUMMY DATA
-- =========================================

INSERT INTO skills (
    id,
    name
)
VALUES
    (uuid_generate_v4(), 'React'),
    (uuid_generate_v4(), 'Spring Boot'),
    (uuid_generate_v4(), 'PostgreSQL'),
    (uuid_generate_v4(), 'Docker'),
    (uuid_generate_v4(), 'AWS')
ON CONFLICT (name) DO NOTHING;



-- =========================================
-- EMPLOYEE SKILLS TABLE DUMMY DATA
-- =========================================

INSERT INTO employee_skills (
    employee_id,
    skill_id,
    proficiency_level,
    years_of_experience
)
SELECT
    e.id,
    s.id,
    'ADVANCED',
    3.5
FROM employees e
         JOIN skills s ON s.name IN ('React', 'Spring Boot')
ON CONFLICT DO NOTHING;



-- =========================================
-- PROJECTS TABLE DUMMY DATA
-- =========================================

INSERT INTO projects (
    id,
    name,
    description,
    start_date,
    end_date,
    status,
    priority,
    created_by
)
SELECT
    uuid_generate_v4(),
    project_name,
    project_description,
    CURRENT_DATE - INTERVAL '30 days',
    CURRENT_DATE + INTERVAL '90 days',
    'IN_PROGRESS',
    'HIGH',
    u.id
FROM users u,
     (
         VALUES
             ('Smart Workforce Hub', 'Enterprise workforce management platform'),
             ('AI Analytics Dashboard', 'AI-powered reporting dashboard'),
             ('Employee Mobile App', 'Cross-platform employee app'),
             ('Task Automation System', 'Workflow automation project'),
             ('Internal HR Portal', 'Modern HR management portal')
     ) AS p(project_name, project_description)
LIMIT 5
ON CONFLICT DO NOTHING;



-- =========================================
-- PROJECT MEMBERS TABLE DUMMY DATA
-- =========================================

INSERT INTO project_members (
    project_id,
    employee_id,
    role
)
SELECT
    p.id,
    e.id,
    'Developer'
FROM projects p
         CROSS JOIN employees e
LIMIT 5
ON CONFLICT DO NOTHING;



-- =========================================
-- TASKS TABLE DUMMY DATA
-- =========================================

INSERT INTO tasks (
    id,
    title,
    description,
    project_id,
    assigned_to,
    assigned_by,
    status,
    priority,
    due_date,
    estimated_hours,
    actual_hours,
    completion_percentage
)
SELECT
    uuid_generate_v4(),
    task_title,
    task_description,
    p.id,
    e.id,
    e.id,
    'IN_PROGRESS',
    'HIGH',
    CURRENT_TIMESTAMP + INTERVAL '7 days',
    12,
    6,
    50
FROM projects p
         CROSS JOIN employees e,
     (
         VALUES
             ('Build Authentication Module', 'Implement JWT authentication'),
             ('Create Dashboard UI', 'Develop analytics dashboard'),
             ('Develop AI Chatbot', 'Integrate OpenAI assistant'),
             ('Optimize Database Queries', 'Improve API performance'),
             ('Implement Notifications', 'Build real-time notifications')
     ) AS t(task_title, task_description)
LIMIT 5
ON CONFLICT DO NOTHING;



-- =========================================
-- TASK COMMENTS TABLE DUMMY DATA
-- =========================================

INSERT INTO task_comments (
    id,
    task_id,
    employee_id,
    comment
)
SELECT
    uuid_generate_v4(),
    t.id,
    e.id,
    'Task progress updated successfully.'
FROM tasks t
         CROSS JOIN employees e
LIMIT 5
ON CONFLICT DO NOTHING;



-- =========================================
-- TASK ACTIVITY TABLE DUMMY DATA
-- =========================================

INSERT INTO task_activity (
    id,
    task_id,
    employee_id,
    activity_type,
    old_value,
    new_value
)
SELECT
    uuid_generate_v4(),
    t.id,
    e.id,
    'STATUS_CHANGED',
    'PENDING',
    'IN_PROGRESS'
FROM tasks t
         CROSS JOIN employees e
LIMIT 5
ON CONFLICT DO NOTHING;



-- =========================================
-- ATTENDANCE TABLE DUMMY DATA
-- =========================================

INSERT INTO attendance (
    id,
    employee_id,
    attendance_date,
    check_in,
    check_out,
    work_hours,
    status
)
SELECT
    uuid_generate_v4(),
    e.id,
    CURRENT_DATE,
    CURRENT_TIMESTAMP - INTERVAL '8 hours',
    CURRENT_TIMESTAMP,
    8,
    'PRESENT'
FROM employees e
LIMIT 5
ON CONFLICT DO NOTHING;



-- =========================================
-- NOTIFICATIONS TABLE DUMMY DATA
-- =========================================

INSERT INTO notifications (
    id,
    user_id,
    title,
    message,
    type,
    is_read
)
SELECT
    uuid_generate_v4(),
    u.id,
    'Task Deadline Reminder',
    'You have a pending high priority task due soon.',
    'TASK_ALERT',
    FALSE
FROM users u
LIMIT 5
ON CONFLICT DO NOTHING;



-- =========================================
-- AI CONVERSATIONS TABLE DUMMY DATA
-- =========================================

INSERT INTO ai_conversations (
    id,
    user_id,
    title
)
SELECT
    uuid_generate_v4(),
    u.id,
    'HR Assistant Chat'
FROM users u
LIMIT 5
ON CONFLICT DO NOTHING;



-- =========================================
-- AI MESSAGES TABLE DUMMY DATA
-- =========================================

INSERT INTO ai_messages (
    id,
    conversation_id,
    role,
    content,
    token_usage
)
SELECT
    uuid_generate_v4(),
    c.id,
    'USER',
    'How many leave days do I have remaining?',
    120
FROM ai_conversations c
LIMIT 5
ON CONFLICT DO NOTHING;



-- =========================================
-- AI SUMMARIES TABLE DUMMY DATA
-- =========================================

INSERT INTO ai_summaries (
    id,
    generated_by,
    entity_type,
    entity_id,
    summary
)
SELECT
    uuid_generate_v4(),
    u.id,
    'TASK',
    uuid_generate_v4(),
    'Project is progressing well with 80% completion.'
FROM users u
LIMIT 5
ON CONFLICT DO NOTHING;



-- =========================================
-- FILE UPLOADS TABLE DUMMY DATA
-- =========================================

INSERT INTO file_uploads (
    id,
    uploaded_by,
    file_name,
    file_url,
    file_type,
    file_size
)
SELECT
    uuid_generate_v4(),
    u.id,
    'employee_resume.pdf',
    'https://example.com/uploads/resume.pdf',
    'application/pdf',
    204800
FROM users u
LIMIT 5
ON CONFLICT DO NOTHING;



-- =========================================
-- ACTIVITY LOGS TABLE DUMMY DATA
-- =========================================

INSERT INTO activity_logs (
    id,
    user_id,
    action,
    module,
    entity_id,
    details,
    ip_address,
    user_agent
)
SELECT
    uuid_generate_v4(),
    u.id,
    'LOGIN',
    'AUTH',
    uuid_generate_v4(),
    '{"status":"success"}',
    '192.168.1.1',
    'Chrome Browser'
FROM users u
LIMIT 5
ON CONFLICT DO NOTHING;



-- =========================================
-- SETTINGS TABLE DUMMY DATA
-- =========================================

INSERT INTO settings (
    id,
    user_id,
    theme,
    notifications_enabled,
    language
)
SELECT
    uuid_generate_v4(),
    u.id,
    'DARK',
    TRUE,
    'EN'
FROM users u
LIMIT 5
ON CONFLICT DO NOTHING;
