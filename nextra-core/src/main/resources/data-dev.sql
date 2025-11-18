sql
-- Insert sample clients for DEV (H2). Adjust columns if your BaseEntity adds required non-null fields.
INSERT INTO clients (name, email, phone, fiscal_id, address, preferred_budget_min, preferred_budget_max, preferred_locations, preferred_property_types, preferred_size_min, preferred_size_max, notes)
VALUES
  ('Mario Rossi', 'mario.rossi@example.com', '+39 333 111222', 'MRSS80A01H501X', 'Via Roma 1, Milano', 150000.00, 300000.00, 'Milano, Monza', 'Apartment,Loft', 50.0, 120.0, 'Looking for nearby school'),
  ('Anna Bianchi', 'anna.bianchi@example.com', '+39 345 999888', 'BNCA90B02F205Y', 'Corso Francia 10, Torino', 80000.00, 150000.00, 'Torino', 'Flat,Studio', 35.0, 70.0, 'First-time buyer');
