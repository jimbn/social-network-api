require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('successfully conntected to mongodb');
    })
    .catch(err => console.log(err));


app.use(require('routes'));

app.listen(PORT, () => console.log(`Successfully created server`));


