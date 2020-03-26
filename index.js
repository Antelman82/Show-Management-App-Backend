const express = require('express')
// 1. Require body-parser and save it to the variable parser.

const app = express();
const cors = require("cors");

const customerController = require('./controllers/customers');
const venueController = require('./controllers/venues');
const userController = require('./controllers/users');
const showController = require('./controllers/shows');
const typeController = require('./controllers/types');
const productController = require('./controllers/products');
const equipmentController = require('./controllers/equipments');

// 2. Add the code needed to make body-parser work within your app.

app.use(cors());
app.use(express.json());
app.use('/api/customers/', customerController);
app.use('/api/venues/', venueController);
app.use('/api/users/', userController);
app.use('/api/shows/', showController);
app.use('/api/types/', typeController);
app.use('/api/products/', productController);
app.use('/api/equipments/', equipmentController);
//app.use(parser.json());

app.listen(4000, () => console.log('Server running on port 4000!'))
