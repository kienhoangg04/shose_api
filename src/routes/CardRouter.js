const express = require('express');
const router = express.Router();
const CardController = require('../controllers/CardController');

router.post('/create', CardController.createCard);
router.post('/get-all-card', CardController.getAllCard);
router.post('/delete-card', CardController.deleteCard);

module.exports = router;
