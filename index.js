const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

//Database Connection
const db = require('./config/database');
db.authenticate().then(() => {
  console.log('Database connection successful.');
}).catch(err => {
  console.error('Database connection failed:' + err);
})

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb'}));
app.use(cors("*"));

//Gig routes
app.use('/', require('./routes/routes'));

const PORT = process.env.PORT || 5000;
db.sync().then(() => {
  app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error:", + err));
