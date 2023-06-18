const express = require('express');
const {getAllCats, addCat, updateCat, deleteCat, getCatById,searchCat} = require('../controller/cat-controller');
const router = express.Router();

router.get('/cat', getAllCats);
router.post('/cat', addCat);
router.put('/cat/:id', updateCat);
router.delete('/cat/:id', deleteCat);
router.get('/cat/search', searchCat);

module.exports = router;