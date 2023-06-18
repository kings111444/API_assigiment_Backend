const express = require('express');
const {getAllUsers, addUser, updateUser, deleteUser, getUserById} = require('../controller/user-controller');
const router = express.Router();

router.get('/users', getAllUsers);
router.post('/users', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;