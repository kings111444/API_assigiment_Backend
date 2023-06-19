const express = require('express');
const {getAllUsers, addUser, updateUser, deleteUser, login} = require('../controller/user-controller');
const router = express.Router();

router.get('/users', getAllUsers);
router.post('/register', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/login', login);

module.exports = router;