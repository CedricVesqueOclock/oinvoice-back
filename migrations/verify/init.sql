-- Verify Gestionnaire-De-Cliente-Et-Facture-Back:init on pg
-- Le fichier sqitch verify sert à vérifier que les tables que l'ont veut créer par le sqitch deploy sont bien crées
BEGIN;

SELECT * FROM "user" WHERE false;
SELECT * FROM "document" WHERE false;
SELECT * FROM "client" WHERE false;
SELECT * FROM "product" WHERE false;
SELECT * FROM "document_line" WHERE false;


ROLLBACK;
