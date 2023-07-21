# Initialisation du projet

## init package

```npm init -y```
```npm i express dotenv pg cors bcrypt```

Ces commandes initialisent le projet puis installe via ```npm i```: 

- **express** qui permet de faire fonctionner le serveur 
- **dotenv** qui permet l'usage d'un .env 
- **pg** sert à indiquer à la base de donnée que l'on va se servir de la bibliothèque javascrypt PostgreSQL.
- **cors** sert à filtrer l'acces des requetes d'autres domaines, il permet de désigner les domaines de confiance
- **bcrypt** permet l'encodage des mots de passe
- **joi** pour la validation des entrées utilisateur, la vérification des données reçues des API, la définition de schémas
  
## Création de la bdd oinvoice (Création DB via Postgres (PSQL))

`createdb oinvoice`



## Sqitch init (outil de migration)

```sqitch init Gestionnaire-De-Cliente-Et-Facture-Back --engine pg```
```sqitch target add migration --top-dir sql```
```sqitch add init -n 'création de la bdd oinvoice'```
```sqitch deploy init```

## Seeding

Pour lancer le script de seeding effectuer cette commande ``` psql -d oinvoice -f ./data/seeding.sql; ``` ou alors lancer le via les scripts npm

## Installation ESLINTRC

``` eslint --init ``` 
Sélectionner : 
- How would you like to use ESLint? Style 
- What type of modules does your project use?      **ESM**
- Which framework does your project use?     **None**
- Does your project use TypeScript?     **No**
- Where does your code run?       **node**
- How would you like to define a style for your project?       **guide**
- Which style guide do you want to follow?        **Airbnb**
- What format do you want your config file to be in?       **JSON**
- The config that you've selected requires the following dependencies(dépendence ABC) Would you like to install them now?     **Yes**
- Which package manager do you want to use?     **npm**
