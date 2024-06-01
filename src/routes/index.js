const express = require('express');
const router = express.Router();

const readUser = require('../controller/readUser');
const deleteUser = require('../controller/deleteUser');
const user = require('../controller/user');

router.get('/getuser/:email', readUser.getUser);
router.get('/getusers', readUser.getUser);
router.delete('/deleteuser/:email', deleteUser.deleteUser);
router.post('/user', user.user);

module.exports = router