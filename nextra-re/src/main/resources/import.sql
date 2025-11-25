-- ====================================================
-- SAMPLE DATA FOR nextra-re MODULE (Development Only)
-- ====================================================

-- ====================================================
-- CLIENTS: Sample clients for testing
-- ====================================================
INSERT INTO clients (id, name, email, phone, fiscal_id, address, preferred_budget_min, preferred_budget_max, preferred_locations, preferred_property_types, preferred_size_min, preferred_size_max, notes, deleted, created_at, updated_at, created_by, updated_by)
VALUES
  (1, 'Mario Rossi', 'mario.rossi@example.com', '+39 333 111222', 'MRSS80A01H501X', 'Via Roma 1, Milano, 20100', 150000.00, 300000.00, 'Milano, Monza', 'APARTMENT,LOFT', 50.0, 120.0, 'Looking for apartment near schools and public transport', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
  (2, 'Anna Bianchi', 'anna.bianchi@example.com', '+39 345 999888', 'BNCA90B02F205Y', 'Corso Francia 10, Torino, 10138', 80000.00, 150000.00, 'Torino', 'FLAT,STUDIO', 35.0, 70.0, 'First-time buyer, prefers modern buildings', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
  (3, 'Giuseppe Verdi', 'giuseppe.verdi@example.com', '+39 347 555666', 'VRDG75C03L736Z', 'Piazza Duomo 5, Milano, 20121', 400000.00, 600000.00, 'Milano Centro', 'VILLA,PENTHOUSE', 150.0, 250.0, 'Looking for luxury property in city center', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin');

-- ====================================================
-- PROPERTIES: Sample properties for testing
-- ====================================================
INSERT INTO properties (id, title, description, price, size_sqm, bedrooms, bathrooms, address, location, property_type, status, year_built, deleted, created_at, updated_at, created_by, updated_by)
VALUES
  (1, 'Modern Apartment in City Center', 'Beautiful 2-bedroom apartment in the heart of Milano. Fully renovated with modern finishes, large living room with balcony, and equipped kitchen. Close to metro station and all amenities.', 280000.00, 85.0, 2, 2, 'Via Dante 15, Milano, MI, 20121', 'Milano Centro', 'APARTMENT', 'AVAILABLE', 2018, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
  (2, 'Cozy Studio Near University', 'Perfect studio for students or young professionals. Bright and well-organized space with kitchen corner and bathroom. Located near university campus and metro line.', 120000.00, 45.0, 1, 1, 'Via Celoria 20, Milano, MI, 20133', 'Milano Città Studi', 'APARTMENT', 'AVAILABLE', 2015, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
  (3, 'Luxury Penthouse with Terrace', 'Exclusive penthouse on the top floor with 360° panoramic terrace. High-end finishes, smart home system, 3 bedrooms with walk-in closets, 3 bathrooms, and a 100 sqm terrace with city views.', 850000.00, 200.0, 3, 3, 'Corso Venezia 45, Milano, MI, 20121', 'Milano Centro', 'HOUSE', 'AVAILABLE', 2020, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
  (4, 'Charming Villa with Garden', 'Beautiful independent villa in residential area. Large garden with pool, 4 bedrooms, 3 bathrooms, garage for 2 cars. Perfect for families.', 650000.00, 250.0, 4, 3, 'Via dei Giardini 8, Monza, MB, 20900', 'Monza', 'VILLA', 'AVAILABLE', 2010, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
  (5, 'Renovated Loft in Industrial Zone', 'Unique loft in converted industrial building. Open space with high ceilings, exposed brick walls, and large windows. Includes mezzanine bedroom and designer bathroom.', 320000.00, 110.0, 1, 1, 'Via Tortona 32, Milano, MI, 20144', 'Milano Tortona', 'APARTMENT', 'RESERVED', 2019, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin');

-- ====================================================
-- NOTE: We need to create users first since appointments have FK to users table
-- These are the same users from nextra-core for consistency
-- ====================================================
INSERT INTO users (id, username, password, email, active, deleted, created_at, updated_at, created_by, updated_by) VALUES
  (1, 'admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', 'admin@nextra.com', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'system', 'system');

INSERT INTO roles (id, name) VALUES (1, 'ROLE_ADMIN');

INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);

-- ====================================================
-- APPOINTMENTS: Sample appointments for testing
-- ====================================================
INSERT INTO appointments (id, title, start_time, end_time, location, notes, status, user_id, client_id, property_id, deleted, created_at, updated_at, created_by, updated_by)
VALUES
  (1, 'Property Viewing - Modern Apartment', DATEADD('DAY', 1, CURRENT_TIMESTAMP), DATEADD('DAY', 1, DATEADD('HOUR', 1, CURRENT_TIMESTAMP)), 'Via Dante 15, Milano', 'First viewing with Mario Rossi. Bring property details and contracts.', 'SCHEDULED', 1, 1, 1, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
  (2, 'Client Meeting - First Time Buyer', DATEADD('DAY', 2, CURRENT_TIMESTAMP), DATEADD('DAY', 2, DATEADD('HOUR', 1, CURRENT_TIMESTAMP)), 'Office', 'Initial consultation with Anna Bianchi to understand requirements and budget.', 'SCHEDULED', 1, 2, NULL, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
  (3, 'Luxury Property Tour', DATEADD('DAY', 3, CURRENT_TIMESTAMP), DATEADD('DAY', 3, DATEADD('HOUR', 2, CURRENT_TIMESTAMP)), 'Corso Venezia 45, Milano', 'Show penthouse to Giuseppe Verdi. Prepare high-end presentation.', 'SCHEDULED', 1, 3, 3, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
  (4, 'Contract Signing - Loft', DATEADD('DAY', -2, CURRENT_TIMESTAMP), DATEADD('DAY', -2, DATEADD('HOUR', 1, CURRENT_TIMESTAMP)), 'Office', 'Finalize contract for Via Tortona property.', 'COMPLETED', 1, NULL, 5, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin');

-- ====================================================
-- CATEGORIES: Property categories/tags
-- ====================================================
INSERT INTO categories (id, name, description, deleted, created_at, updated_at, created_by, updated_by)
VALUES
  (1, 'Investment', 'Properties suitable for investment purposes', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
  (2, 'Luxury', 'High-end luxury properties', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
  (3, 'First Home', 'Properties suitable for first-time buyers', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
  (4, 'Renovated', 'Recently renovated properties', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin');

-- ====================================================
-- ACCOUNTS: User accounts (name, email, phone, role)
-- Note: These are different from the 'users' table for authentication
-- ====================================================
INSERT INTO accounts (id, name, email, phone, role, deleted, created_at, updated_at, created_by, updated_by)
VALUES
  (1, 'Admin Account', 'admin.account@nextra.com', '+39 02 1234567', 'ADMIN', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
  (2, 'Agent Account', 'agent@nextra.com', '+39 02 7654321', 'AGENT', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
  (3, 'Client Account', 'client@nextra.com', '+39 333 9998888', 'CLIENT', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin');

-- ====================================================
-- SEQUENCE RESETS: Update auto-increment sequences
-- H2 doesn't auto-update sequences when using explicit IDs in INSERTs
-- We need to manually set the next value after initial data load
-- ====================================================
ALTER TABLE clients ALTER COLUMN id RESTART WITH 4;
ALTER TABLE properties ALTER COLUMN id RESTART WITH 6;
ALTER TABLE users ALTER COLUMN id RESTART WITH 2;
ALTER TABLE roles ALTER COLUMN id RESTART WITH 2;
ALTER TABLE appointments ALTER COLUMN id RESTART WITH 5;
ALTER TABLE categories ALTER COLUMN id RESTART WITH 5;
ALTER TABLE accounts ALTER COLUMN id RESTART WITH 4;
