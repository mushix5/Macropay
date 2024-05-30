const express = require('express');
const router = express.Router();

const assUser = require('../controller/createUser');
const readUser = require('../controller/readUser');
const deleteUser = require('../controller/deleteUser');
const updateUser = require('../controller/updateUser');

router.post('/adduser', assUser.createUser);
router.get('/getuser/:email', readUser.getUser);
router.delete('/deleteuser/:email', deleteUser.deleteUser);
router.post('/updateuser', updateUser.updateUser);

module.exports = router