-- Insert Users
INSERT INTO users (username, firstName, lastName, password_hash, created_at, last_active) VALUES
('john_doe', 'John', 'Doe', 'password123', '2023-01-01T10:00:00Z', '2023-06-15T14:30:00Z'),
('jane_smith', 'Jane', 'Smith', 'password123', '2023-01-02T11:15:00Z', '2023-06-15T15:45:00Z'),
('bob_johnson', 'Bob', 'Johnson', 'password123', '2023-01-03T09:30:00Z', '2023-06-14T18:20:00Z'),
('alice_williams', 'Alice', 'Williams', 'password123', '2023-01-04T14:45:00Z', '2023-06-15T10:10:00Z'),
('charlie_brown', 'Charlie', 'Brown', 'password123', '2023-01-05T16:20:00Z', '2023-06-15T12:00:00Z');

-- Insert Conversations
INSERT INTO conversations (name, created_at, updated_at) VALUES
(NULL, '2023-06-01T08:00:00Z', '2023-06-15T15:45:00Z'),
('Team Project', '2023-06-02T10:30:00Z', '2023-06-15T14:30:00Z'),
('Family Chat', '2023-06-03T12:15:00Z', '2023-06-14T18:20:00Z');

-- Insert User_Conversations
INSERT INTO user_conversations (user_id, conversation_id, joined_at) VALUES
(1, 1, '2023-06-01T08:00:00Z'),
(2, 1, '2023-06-01T08:05:00Z'),
(1, 2, '2023-06-02T10:30:00Z'),
(2, 2, '2023-06-02T10:35:00Z'),
(3, 2, '2023-06-02T10:40:00Z'),
(4, 2, '2023-06-02T10:45:00Z'),
(1, 3, '2023-06-03T12:15:00Z'),
(3, 3, '2023-06-03T12:20:00Z'),
(5, 3, '2023-06-03T12:25:00Z');

-- Insert Messages
INSERT INTO messages (sender_id, conversation_id, content, sent_at, is_read) VALUES
(1, 1, 'Hey Jane, how are you?', '2023-06-15T14:30:00Z', true),
(2, 1, 'Hi John! I''m good, thanks for asking. How about you?', '2023-06-15T14:32:00Z', true),
(1, 1, 'I''m doing well. Just wanted to catch up!', '2023-06-15T14:35:00Z', true),
(2, 1, 'That''s great! Anything exciting happening?', '2023-06-15T14:38:00Z', false),
(1, 2, 'Team, let''s discuss the project timeline.', '2023-06-15T10:00:00Z', true),
(3, 2, 'Sounds good. I have some ideas to share.', '2023-06-15T10:05:00Z', true),
(4, 2, 'Great, I''ll prepare a short presentation.', '2023-06-15T10:10:00Z', true),
(2, 2, 'Looking forward to it!', '2023-06-15T10:15:00Z', false),
(1, 3, 'Hey family, who''s up for a barbecue this weekend?', '2023-06-14T18:00:00Z', true),
(3, 3, 'Count me in!', '2023-06-14T18:10:00Z', true),
(5, 3, 'Sounds fun! What should I bring?', '2023-06-14T18:20:00Z', true),
(1, 3, 'Just bring yourselves, I''ll take care of the rest!', '2023-06-15T09:00:00Z', false);