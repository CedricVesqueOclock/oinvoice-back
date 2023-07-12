# Initialisation du projet

## init package

`npm init -y`

## Création de la bdd oinvoice (Création DB via Postgres (PSQL))

`createdb oinvoice`

## Sqitch init (outil de migration)

`sqitch init Gestionnaire-De-Cliente-Et-Facture-Back --engine pg`
`sqitch target add migration --top-dir sql`
`sqitch add init -n 'création de la bdd oinvoice'`
