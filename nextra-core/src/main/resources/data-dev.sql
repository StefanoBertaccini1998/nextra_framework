-- ====================================================
-- ROLES: Initialize the 3 system roles
-- ====================================================
INSERT INTO roles (id, name) VALUES
  (1, 'ROLE_ADMIN'),
  (2, 'ROLE_NORMAL'),
  (3, 'ROLE_LOW_USER');

-- ====================================================
-- USERS: Test users with encrypted passwords
-- admin -> password: "admin" (BCrypt)
-- mario, anna, lowuser -> password: "password" (BCrypt)
-- ====================================================
INSERT INTO users (id, username, password, email, active, created_at, updated_at, created_by, updated_by) VALUES
  (1, 'admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', 'admin@nextra.com', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'system', 'system'),
  (2, 'mario', '$2a$10$N9qo.slLXP9Q9GpZ0S2IIO2vlXP9Q9GpZ0S2IIO2vlXP9Q9GpZ0S2I', 'mario@nextra.com', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'system', 'system'),
  (3, 'anna', '$2a$10$N9qo.slLXP9Q9GpZ0S2IIO2vlXP9Q9GpZ0S2IIO2vlXP9Q9GpZ0S2I', 'anna@nextra.com', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'system', 'system'),
  (4, 'lowuser', '$2a$10$N9qo.slLXP9Q9GpZ0S2IIO2vlXP9Q9GpZ0S2IIO2vlXP9Q9GpZ0S2I', 'lowuser@nextra.com', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'system', 'system');

-- ====================================================
-- USER_ROLES: Assign roles to users
-- admin -> ADMIN
-- mario -> NORMAL (agent)
-- anna -> NORMAL (agent)
-- lowuser -> LOW_USER (limited access)
-- ====================================================
INSERT INTO user_roles (user_id, role_id) VALUES
  (1, 1), -- admin has ROLE_ADMIN
  (2, 2), -- mario has ROLE_NORMAL
  (3, 2), -- anna has ROLE_NORMAL
  (4, 3); -- lowuser has ROLE_LOW_USER

-- ====================================================
-- CLIENTS: Sample client data
-- ====================================================
INSERT INTO clients (name, email, phone, fiscal_id, address, preferred_budget_min, preferred_budget_max, preferred_locations, preferred_property_types, preferred_size_min, preferred_size_max, notes)
VALUES
  ('Mario Rossi', 'mario.rossi@example.com', '+39 333 111222', 'MRSS80A01H501X', 'Via Roma 1, Milano', 150000.00, 300000.00, 'Milano, Monza', 'Apartment,Loft', 50.0, 120.0, 'Looking for nearby school'),
  ('Anna Bianchi', 'anna.bianchi@example.com', '+39 345 999888', 'BNCA90B02F205Y', 'Corso Francia 10, Torino', 80000.00, 150000.00, 'Torino', 'Flat,Studio', 35.0, 70.0, 'First-time buyer');
