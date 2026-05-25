CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS roles (
                                     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS users (
                                     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

                                     email VARCHAR(255) UNIQUE NOT NULL,
                                     password VARCHAR(255) NOT NULL,

                                     first_name VARCHAR(100) NOT NULL,
                                     last_name VARCHAR(100) NOT NULL,

                                     phone VARCHAR(20),

                                     profile_image_url TEXT,

                                     is_active BOOLEAN DEFAULT TRUE,
                                     is_email_verified BOOLEAN DEFAULT FALSE,

                                     last_login TIMESTAMP,

                                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                                     deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS user_roles (
                                          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                                          role_id UUID REFERENCES roles(id) ON DELETE CASCADE,

                                          PRIMARY KEY(user_id, role_id)
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
                                              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

                                              user_id UUID REFERENCES users(id) ON DELETE CASCADE,

                                              token TEXT NOT NULL,
                                              expiry_date TIMESTAMP NOT NULL,

                                              revoked BOOLEAN DEFAULT FALSE,

                                              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS departments (
                                           id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

                                           name VARCHAR(150) UNIQUE NOT NULL,
                                           code VARCHAR(20) UNIQUE NOT NULL,

                                           description TEXT,

                                           manager_id UUID,

                                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employees (
                                         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

                                         user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,

                                         employee_code VARCHAR(50) UNIQUE NOT NULL,

                                         designation VARCHAR(150) NOT NULL,

                                         department_id UUID REFERENCES departments(id),

                                         manager_id UUID REFERENCES employees(id),

                                         joining_date DATE NOT NULL,

                                         experience_years NUMERIC(4,1),

                                         salary NUMERIC(12,2),

                                         employment_type VARCHAR(50),

                                         status VARCHAR(50) DEFAULT 'ACTIVE',

                                         address TEXT,

                                         city VARCHAR(100),
                                         state VARCHAR(100),
                                         country VARCHAR(100),

                                         emergency_contact_name VARCHAR(150),
                                         emergency_contact_phone VARCHAR(20),

                                         bio TEXT,

                                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                                         deleted BOOLEAN DEFAULT FALSE
);

DO $$
    BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_type WHERE typname = 'task_status'
        ) THEN
            CREATE TYPE task_status AS ENUM (
                'PENDING',
                'IN_PROGRESS',
                'COMPLETED',
                'BLOCKED'
                );
        END IF;
    END
$$;

CREATE INDEX IF NOT EXISTS idx_users_email
    ON users(email);

CREATE INDEX IF NOT EXISTS idx_employee_department
    ON employees(department_id);


