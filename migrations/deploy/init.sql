-- SQLBook: Code
-- Deploy Gestionnaire-De-Cliente-Et-Facture-Back:init to pg

-- le fichier sqitch deploy sert à mettre en place des modifications sur une base de donnée.
BEGIN;

-- Les créations de domaines consistent à crée des verifications sur les données acceptées dans les champs des tables associées.
CREATE DOMAIN rfc_email AS text
CHECK (value ~ '^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');

CREATE DOMAIN postal_code_fr AS text
CHECK (value ~ '^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$');

-- CREATE DOMAIN posnumeric AS numeric(15,4)
-- CHECK (value >= 0);

-- CREATE DOMAIN posint AS int
-- CHECK (value >= 0);

CREATE DOMAIN phone_number_fr AS text
CHECK (value ~ '(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}');

-- CREATE DOMAIN siren AS text
-- CHECK (value ~ '^\d{14}$');

-- CREATE DOMAIN siret AS text
-- CHECK (value ~ '^\d{9}$');

-- Ici on crée les tables correspondants aux différents utilisateur, ces dernières ont un nombre de caractéristique à definir à la création de celles-ci.
-- Ces caractéristiques peuvent avoir des contraintes simple de définit directement (text, NOT NULL, UNIQUE) ou peuvent se servir de domaine pour des contraintes plus complexes.
CREATE TABLE "user" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "mail" rfc_email NOT NULL,
  "password" text NOT NULL,
  "siret" text UNIQUE,
  "siren" text UNIQUE,
  "name" text NOT NULL,
  "adress" text NOT NULL,
  "zip_code" postal_code_fr NOT NULL,
  "city" text NOT NULL,
  "number" phone_number_fr NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

CREATE TABLE "document" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "type" text NOT NULL UNIQUE,
  "order_date" timestamptz NOT NULL DEFAULT now(),
  "delivry_date" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "user_id" int NOT NULL REFERENCES "user"("id")
);

CREATE TABLE "client" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" text NOT NULL,
  "lastname" text NOT NULL,
  "siret" text UNIQUE,
  "siren" text UNIQUE,
  "mail" rfc_email NOT NULL,
  "adress" text NOT NULL,
  "zip_code" postal_code_fr NOT NULL,
  "city" text NOT NULL,
  "number" phone_number_fr NOT NULL,
  "user_id" INT NOT NULL REFERENCES "user"("id"),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

CREATE TABLE "product" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL UNIQUE,
  "description" text,
  "category" text NOT NULL,
  "price_ht" decimal(10,2) NOT NULL,
  "rate" int NOT NULL,
  "user_id" INT NOT NULL REFERENCES "user"("id"),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

CREATE TABLE "document_line" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "quantity" int NOT NULL,
  "price" decimal(10,2) NOT NULL,
  "document_id" INT NOT NULL REFERENCES "document"("id"),
  "client_id" INT NOT NULL REFERENCES "client"("id"),
  "product_id" INT NOT NULL REFERENCES "product"("id"),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

COMMIT;
