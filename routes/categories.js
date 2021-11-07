const express = require('express');
const router = express.Router();
const { getAllCategories, addCategory, deleteCategory, updateCategory } = require('../controllers/categories');

router
  .route('/')
  .get(getAllCategories)
  .post(addCategory);

router
  .route('/:id')
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;