--CREATE DATABASE adminproductsdb;
\c adminproductsdb

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price FLOAT NOT NULL,
    stock INT NOT NULL
);
