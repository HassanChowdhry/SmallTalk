-- Active: 1735060148619@@127.0.0.1@5432
-- Switch to the `postgres` database (PostgreSQL does not support the USE statement)
-- Ensure that the database exists or create it
CREATE DATABASE smalltalk;

-- Connect to the `smalltalk` database
\c smalltalk;

-- Create the `users` table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Create the `inboxes` table
CREATE TABLE IF NOT EXISTS inboxes (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the `inbox_users` table
CREATE TABLE IF NOT EXISTS inbox_users (
  id SERIAL PRIMARY KEY,
  inbox_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_inbox FOREIGN KEY (inbox_id) REFERENCES inboxes(id) ON DELETE CASCADE,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the `messages` table
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  inbox_id INT NOT NULL,
  user_id INT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_inbox FOREIGN KEY (inbox_id) REFERENCES inboxes(id) ON DELETE CASCADE,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
