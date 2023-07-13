const path = require('node:path');
const express = require('express');
const cors = require('cors');


// const router = require('./routers');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// On lève la restriction CORS pour nos amis React
app.use(cors(process.env.CORS_DOMAINS ?? 'localhost'));

// app.use(router);

module.exports = app;
