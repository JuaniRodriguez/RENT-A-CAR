--DROP TABLE IF EXISTS cars;
--DROP TABLE IF EXISTS users;
--DROP TABLE IF EXISTS rents;

PRAGMA foreign_keys=OFF;
CREATE TABLE IF NOT EXISTS cars(
    id INTEGER PRIMARY KEY NOT NULL,
    brand STRING NOT NULL,
    model STRING NOT NULL,
    year INTEGER NOT NULL,
    kms INTEGER NOT NULL,
    color STRING NOT NULL,
    ac STRING NOT NULL,
    passengers INTEGER NOT NULL,
    transmission STRING NOT NULL,
    picture STRING NOT NULL,
    price INTEGER NOT NULL,
    createdAt DATE,
    updatedAt DATE
    
);

CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY NOT NULL,
    name STRING NOT NULL,
    surname STRING NOT NULL,
    documentType STRING NOT NULL,
    documentNumber STRING NOT NULL,
    nacionality STRING NOT NULL,
    address STRING NOT NULL,
    phone INTEGER NOT NULL,
    email STRING NOT NULL,
    birthDate INTEGER NOT NULL,
    createdAt DATE,
    updatedAt DATE
);

CREATE TABLE IF NOT EXISTS rents(
id INTEGER PRIMARY KEY NOT NULL,
fk_car STRING REFERENCES cars(id),
fk_user STRING REFERENCES users(id),
priceDay INTEGER NOT NULL,
startDate STRING STRING NOT NULL,
finishDate STRING NOT NULL,
totalPrice INTEGER NOT NULL,
payingMethod STRING NOT NULL, 
payed BOOLEAN
createdAt DATE,
updatedAt DATE

);

PRAGMA foreign_keys=ON;

