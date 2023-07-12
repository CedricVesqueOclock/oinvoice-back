-- Deploy Gestionnaire-De-Cliente-Et-Facture-Back:init to pg

-- SQLBook: Code
BEGIN;

CREATE DOMAIN rfc_email AS text
CHECK (value ~ '^(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$');

CREATE DOMAIN postal_code_fr AS text
CHECK (value ~ '^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$');

CREATE DOMAIN posnumeric AS numeric(15,4)
CHECK (value >= 0);

CREATE DOMAIN posint AS int
CHECK (value >= 0);

CREATE DOMAIN phone_number_fr AS text
CHECK (value ~ '/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/
')

CREATE TABLE "user" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "mail" rfc_email NOT NULL,
  "password" text NOT NULL,
  "siret" text UNIQUE,
  "siren" text UNIQUE,
  "name" text NOT NULL,
  "address" text NOT NULL,
  "zip_code" postal_code_fr NOT NULL,
  "city" text NOT NULL,
  "number" phone_number_fr int NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

CREATE TABLE "document" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "type" rfc_email NOT NULL UNIQUE,
  "order_date" timestamptz NOT NULL,
  "delivry_date" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT now(),
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
  "number" phone_number_fr int NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

CREATE TABLE "product" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL UNIQUE,
  "description" text,
  "category" text NOT NULL,
  "price_ht" int NOT NULL,
  "rate" int NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

CREATE TABLE "document_line" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "quantity" int NOT NULL,
  "price" int NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

COMMIT;
