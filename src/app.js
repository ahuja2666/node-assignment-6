const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// Import routes
const blogRoute = require('./routes/blog');


//Router MIddlewares
app.use(express.json());
app.use('/blog', blogRoute);

module.exports = app;
