const express = require('express');
const app = express();
var routes = require('./routes');
const { config } = require('./config/index');
var cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/', (req, res) => res.send('Macropay'));

app.use('/macro', routes);

app.listen(config.port, function() {
    console.log(`http://localhost: ${config.port}`);
  });