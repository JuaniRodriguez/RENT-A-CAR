PRAGMA foreign_keys=OFF;

CREATE TABLE IF NOT EXISTS cars(
    id INTEGER PRIMARY KEY,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year TEXT NOT NULL,
    kms NUMBER NOT NULL,
    color TEXT NOT NULL,
    ac TEXT NOT NULL,
    passengers NUMBER NOT NULL,
    transmission TEXT NOT NULL,
    picture TEXT NOT NULL
    
);

CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    age TEXT NOT NULL,
    phone NUMBER NOT NULL,
    email TEXT NOT NULL,
    document TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS rents(
id INTEGER PRIMARY KEY NOT NULL,
car TEXT REFERENCES cars(brand),
user TEXT REFERENCES users(name),
date NUMBER TEXT NOT NULL,
days NUMBER NOT NULL,
price NUMBER NOT NULL

);

PRAGMA foreign_keys=ON;

--ALTER TABLE cars ADD price NUMBER;

INSERT INTO cars(id,brand,model,year,kms,color,ac,passengers,transmission,picture) VALUES(1,"toyota","corolla",2014,1500,"red","yes",6,"manual","hola");
SELECT * FROM cars;