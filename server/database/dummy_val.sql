-- Inserting users (Alice Johnson, Bob Smith, Carol Williams)
INSERT INTO users (username, first_name, last_name, password) VALUES
('alice.johnson', 'Alice', 'Johnson', 'password123'),
('bob.smith', 'Bob', 'Smith', 'password123'),
('carol.williams', 'Carol', 'Williams', 'password123'),
('you', 'You', 'You', 'password123');  -- Assuming 'You' is a user for this context

-- Inserting inboxes for users
INSERT INTO inboxes (user_id) VALUES
(1),  -- Alice's inbox
(2),  -- Bob's inbox
(3),  -- Carol's inbox
(4);  -- 'You' inbox

-- Inserting inbox-user relationships
INSERT INTO inbox_users (inbox_id, user_id) VALUES
(1, 1),  -- Alice has her inbox
(2, 2),  -- Bob has his inbox
(3, 3),  -- Carol has her inbox
(4, 4);  -- 'You' has their inbox


SELECT * FROM messages;

-- Inserting messages
-- Inserting messages
INSERT INTO messages (inbox_id, user_id, message, created_at) VALUES
(1, 1, 'Hey there! How are you doing?', '2024-12-24 10:30:00'),
(1, 4, 'Hi Alice! I\'m doing great, thanks for asking. How about you?', '2024-12-24 10:32:00'),
(1, 1, 'I\'m good too! Just wanted to catch up. Any plans for the weekend?', '2024-12-24 10:33:00'),
(1, 4, 'Not much planned yet. Might go hiking if the weather\'s nice. You?', '2024-12-24 10:35:00');
