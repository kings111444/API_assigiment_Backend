const express = require('express');
const {getAllCats, addCat, updateCat, deleteCat, getCatId,searchCat} = require('../controller/cat-controller');
const router = express.Router();

router.get('/cat', getAllCats);
router.post('/cat', addCat);
router.put('/cat/', updateCat);
router.delete('/cat/', deleteCat);
router.get('/cat/search', searchCat);
router.get('/cat/id', getCatId);

module.exports = router;