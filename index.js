const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database.');
});

app.post('/favorite', (req, res) => {
    const { favorite } = req.body;
    
    db.query(`INSERT INTO programming_languages (favorites) VALUES (?)`, [favorite], (err, result) => {
        if (err) {
            res.status(500).send('Error inserting favorite programming language');
            throw err;
        }
        res.send('Favorite programming language added.');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});

/* 
QUERY TO CREATE DATABSE

CREATE DATABASE sysdev_recruitment;
*/

/* 
QUERY TO CREATE TABLE

USE sysdev_recruitment;
CREATE TABLE programming_languages (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    favorites VARCHAR(255)
);

/*
POSTMAN 
Post Request
http://localhost:3000/favorite
Body -> raw -> JSON
{
    "favorite": "Javascript"
}
*/