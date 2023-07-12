-- Verify Gestionnaire-De-Cliente-Et-Facture-Back:init on pg

BEGIN;

SELECT * FROM "user" WHERE false;
SELECT * FROM "document" WHERE false;
SELECT * FROM "client" WHERE false;
SELECT * FROM "product" WHERE false;
SELECT * FROM "document_line" WHERE false;


ROLLBACK;
