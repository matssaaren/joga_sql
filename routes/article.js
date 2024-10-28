const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');

// Define routes with controller functions
router.get('/', articleController.getAllArticles);
router.get('/article/:slug', articleController.getArticleBySlug);

module.exports = router;
