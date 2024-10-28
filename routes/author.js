const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.get('/:authorId', authorController.getArticlesByAuthor);

module.exports = router;
