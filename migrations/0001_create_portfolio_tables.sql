-- Migration number: 0001 	 2026-11-04T04:42:24.465Z

PRAGMA foreign_keys = ON;

-- PROFILE

CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    email TEXT NOT NULL,
    cv_url TEXT,
    photo_url TEXT
);

-- PROFILE ROLES

CREATE TABLE IF NOT EXISTS profile_roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER NOT NULL,
    role TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,

    FOREIGN KEY (profile_id)
        REFERENCES profile(id)
        ON DELETE CASCADE
);

-- SOCIAL LINKS

CREATE TABLE IF NOT EXISTS social_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER NOT NULL,
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,

    UNIQUE (profile_id, platform),

    FOREIGN KEY (profile_id)
        REFERENCES profile(id)
        ON DELETE CASCADE
);

--  SKILL CATEGORIES

CREATE TABLE IF NOT EXISTS skill_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
);

-- SKILL ITEMS

CREATE TABLE IF NOT EXISTS skill_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,

    FOREIGN KEY (category_id)
        REFERENCES skill_categories(id)
        ON DELETE CASCADE
);

-- EXPERIENCES

CREATE TABLE IF NOT EXISTS experiences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT,
    location TEXT,
    logo TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0
);

-- EXPERIENCE DESCRIPTIONS

CREATE TABLE IF NOT EXISTS experience_descriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    experience_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,

    FOREIGN KEY (experience_id)
        REFERENCES experiences(id)
        ON DELETE CASCADE
);

-- PROJECTS

CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    image_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0
);

-- PROJECT TECHNOLOGIES

CREATE TABLE IF NOT EXISTS project_technologies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    technology TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,

    FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
);

-- PROJECT FEATURES

CREATE TABLE IF NOT EXISTS project_features (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    feature TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,

    FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
);

-- PROJECT LINKS

CREATE TABLE IF NOT EXISTS project_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL UNIQUE,
    document_url TEXT,
    github_url TEXT,
    live_url TEXT,

    FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
);

-- CERTIFICATIONS

CREATE TABLE IF NOT EXISTS certifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    date TEXT NOT NULL,
    image_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0
);

-- ADMIN USERS

CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ADMIN SESSIONS

CREATE TABLE IF NOT EXISTS admin_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_id INTEGER NOT NULL,
    token_hash TEXT NOT NULL UNIQUE,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (admin_id)
        REFERENCES admin_users(id)
        ON DELETE CASCADE
);
