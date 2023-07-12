-- Revert Gestionnaire-De-Cliente-Et-Facture-Back:init from pg

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
