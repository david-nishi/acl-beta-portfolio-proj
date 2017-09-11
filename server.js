'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser');
const pg = require('pg');
const conString = 'postgres://postgres:newguy@localhost:5432/portfolio';
const client = new pg.Client(conString);
const fs = require('fs');

client.connect();
client.on('error', (err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

app.get('/admin', (request, response) => response.sendFile('admin.html', {root: './public'}));

app.listen(PORT, () => console.log(`server online at port: ${PORT}`));


function loadPortfolioDB() {
  client.query(`
    CREATE TABLE IF NOT EXIST
    dates (
      id SERIAL PRIMARY KEY,
      start DATE,
      end DATE
    )
  `)
    .then(loadDates)
    .catch(console.error);
  client.query(`
    CREATE TABLE IF NOT EXISTS
    technologies (
      id SERIAL PRIMARY KEY,
      tech VARCHAR(50)
    )
  `)
    .then(loadTechnologies)
    .catch(console.error);
  client.query(`
    CREATE TABLE IF NOT EXISTS
    project (
      id SERIAL PRIMARY KEY,
      date_id INTEGER NOT NULL REFERENCES dates(id),
      context VARCHAR (500),
      technologies INTEGER NOT NULL REFERENCES technologies(id),
      url VARCHAR(100),
      image VARCHAR(100)
    )    
  `)
  .then(loadProjects)
  .catch(console.error);
}

function loadDates() {

}
function loadTechnologies() {

}
function loadProjects() {

}
