const express = require('express')
const router = express.Router()
const articleController = require('../controllers/articleController')
const verifyToken = require('./verifyToken')

// CRUD
// Create (Mahasiswa) POST
router.post('/add', verifyToken, articleController.createArticle)

// Read (Mahasiswa) GET
router.get('/get', articleController.getAllArticle)
router.get('/get/:slug', articleController.getArticle)

// Update (Mahasiswa) PATCH
router.get('/put/:slug', verifyToken, articleController.getArticle)
router.put('/put/:slug', verifyToken, articleController.updateArticle)

// Delete (Mahasiswa) DELETE
router.delete('/delete/:id', verifyToken, articleController.deleteArticle)

module.exports = router