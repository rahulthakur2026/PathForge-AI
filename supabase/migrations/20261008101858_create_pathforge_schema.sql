/*
# Create PathForge AI Database Schema

## Overview
Creates the core database tables for PathForge AI — a career roadmapping app.
This is a single-tenant app with no sign-in screen, so all data is intentionally
shared/public and policies allow anon + authenticated access.

## New Tables

1. **user_profiles**
   - Stores the user's profile information (name, email, avatar).
   - Single-row table for the current user.

2. **roadmap_inputs**
   - Stores the dream role configuration that drives roadmap generation.
   - Fields: dream_role (display label), dream_role_key (enum-like key for template selection),
     company (optional target company), timeline (e.g. "6 months"), weekly_hours (int),
     current_skills (text array of skill names).

3. **roadmaps**
   - Stores generated roadmaps as structured JSON.
   - Fields: career (label), nodes (JSON array of roadmap nodes), edges (JSON array of edges).

4. **progress**
   - Tracks which roadmap nodes the user has completed.
   - Fields: node_id (string), completed (boolean), completed_at (timestamp).

## Security
- RLS enabled on all tables.
- All policies use `TO anon, authenticated` because this is a no-auth single-tenant app.
- `USING (true)` / `WITH CHECK (true)` is acceptable here because all data is intentionally public/shared.
*/

-- 1. user_profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Alex Morgan',
  email text NOT NULL DEFAULT 'alex.morgan@example.com',
  avatar text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_user_profiles" ON user_profiles;
CREATE POLICY "anon_select_user_profiles" ON user_profiles FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_user_profiles" ON user_profiles;
CREATE POLICY "anon_insert_user_profiles" ON user_profiles FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_user_profiles" ON user_profiles;
CREATE POLICY "anon_update_user_profiles" ON user_profiles FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_user_profiles" ON user_profiles;
CREATE POLICY "anon_delete_user_profiles" ON user_profiles FOR DELETE
TO anon, authenticated USING (true);

-- 2. roadmap_inputs
CREATE TABLE IF NOT EXISTS roadmap_inputs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dream_role text NOT NULL,
  dream_role_key text NOT NULL DEFAULT 'other',
  company text,
  timeline text NOT NULL DEFAULT '6 months',
  weekly_hours integer NOT NULL DEFAULT 20,
  current_skills text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE roadmap_inputs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_roadmap_inputs" ON roadmap_inputs;
CREATE POLICY "anon_select_roadmap_inputs" ON roadmap_inputs FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_roadmap_inputs" ON roadmap_inputs;
CREATE POLICY "anon_insert_roadmap_inputs" ON roadmap_inputs FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_roadmap_inputs" ON roadmap_inputs;
CREATE POLICY "anon_update_roadmap_inputs" ON roadmap_inputs FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_roadmap_inputs" ON roadmap_inputs;
CREATE POLICY "anon_delete_roadmap_inputs" ON roadmap_inputs FOR DELETE
TO anon, authenticated USING (true);

-- 3. roadmaps
CREATE TABLE IF NOT EXISTS roadmaps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career text NOT NULL,
  nodes jsonb NOT NULL DEFAULT '[]',
  edges jsonb NOT NULL DEFAULT '[]',
  input_id uuid REFERENCES roadmap_inputs(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_roadmaps" ON roadmaps;
CREATE POLICY "anon_select_roadmaps" ON roadmaps FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_roadmaps" ON roadmaps;
CREATE POLICY "anon_insert_roadmaps" ON roadmaps FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_roadmaps" ON roadmaps;
CREATE POLICY "anon_update_roadmaps" ON roadmaps FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_roadmaps" ON roadmaps;
CREATE POLICY "anon_delete_roadmaps" ON roadmaps FOR DELETE
TO anon, authenticated USING (true);

-- 4. progress
CREATE TABLE IF NOT EXISTS progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id text NOT NULL,
  completed boolean NOT NULL DEFAULT true,
  completed_at timestamptz DEFAULT now(),
  roadmap_id uuid REFERENCES roadmaps(id) ON DELETE CASCADE
);

ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_progress" ON progress;
CREATE POLICY "anon_select_progress" ON progress FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_progress" ON progress;
CREATE POLICY "anon_insert_progress" ON progress FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_progress" ON progress;
CREATE POLICY "anon_update_progress" ON progress FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_progress" ON progress;
CREATE POLICY "anon_delete_progress" ON progress FOR DELETE
TO anon, authenticated USING (true);

-- Indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_roadmaps_input_id ON roadmaps(input_id);
CREATE INDEX IF NOT EXISTS idx_progress_roadmap_id ON progress(roadmap_id);
CREATE INDEX IF NOT EXISTS idx_progress_node_id ON progress(node_id);