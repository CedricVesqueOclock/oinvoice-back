-- Revert Gestionnaire-De-Cliente-Et-Facture-Back:init from pg
--Le fichier sqitch revert sert à annuler les modifications effectués par le sqitch deploy
BEGIN;

DROP TABLE
  "user",
  "document",
  "client",
  "product",
  "document_line";


DROP DOMAIN
  "rfc_email",
  "postal_code_fr",
  "posnumeric",
  "posint",
  "phone_number_fr",
  "siret",
  "siren",
  "pass";

COMMIT;
