-- SQLBook: Code
BEGIN;

TRUNCATE TABLE "user", "document", "client", "product", "document_line" RESTART IDENTITY CASCADE;

-- Seed pour la table "user"
INSERT INTO "user" ("mail", "password", "siret", "siren", "name", "adress", "zip_code", "city", "number")
VALUES
  ('user1@gmail.co', 'Password123!', NULL, NULL, 'John Doe', '123 Main St', '12345', 'City1', '0634567890'),
  ('user2@gmail.co', 'SecurePassword456!', '123456789', '98765432115823', 'Jane Smith', '456 Elm St', '67890', 'City2', '0787654321');

-- Seed pour la table "document"
INSERT INTO "document" ("type", "order_date", "delivry_date", "user_id")
VALUES
  ('Type1', NOW(), NULL, 1),
  ('Type2', NOW(), NULL, 2);

-- Seed pour la table "client"
INSERT INTO "client" ("firstname", "lastname", "siret", "siren", "mail", "adress", "zip_code", "city", "number", "user_id")
VALUES
  ('Client1FirstName', 'Client1LastName', NULL, NULL, 'client1@gmail.co', '789 Oak St', '54321', 'City3', '0681357901', 1),
  ('Client2FirstName', 'Client2LastName', '123456789', '98765432124786', 'client2@gmail.co', '321 Pine St', '98765', 'City4', '0753108642', 2);

-- Seed pour la table "product"
INSERT INTO "product" ("name", "description", "category", "price_ht", "rate", "user_id")
VALUES
  ('Product1', 'Description1', 'Category1', 100, 5, 1),
  ('Product2', 'Description2', 'Category2', 200, 4, 2);

-- Seed pour la table "document_line"
INSERT INTO "document_line" ("quantity", "price", "document_id", "client_id", "product_id")
VALUES
  (2, 200, 1, 1, 1),
  (3, 300, 2, 2, 2);

COMMIT;