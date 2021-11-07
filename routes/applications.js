const express = require('express');
const router = express.Router();
const { getAllApplications, addApplication, updateApplication, deleteApplication, getOneApplication } = require('../controllers/applications');

router
  .route('/')
  .get(getAllApplications)
  .post(addApplication);

router
  .route('/:id')
  .get(getOneApplication)
  .put(updateApplication)
  .delete(deleteApplication);

module.exports = router;