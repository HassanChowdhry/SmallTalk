-- Active: 1735060148619@@127.0.0.1@5432
-- Switch to the `postgres` database (PostgreSQL does not support the USE statement)
-- Ensure that the database exists or create it
CREATE DATABASE smalltalk;

-- Connect to the `smalltalk` database
\c smalltalk;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_active TIMESTAMP WITH TIME ZONE
);

-- Create Conversations table
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create User_Conversations table (for many-to-many relationship)
CREATE TABLE user_conversations (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, conversation_id)
);

-- Create Messages table
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);