const express = require('express');
const router = express.Router();
const {
  addEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

router.post('/', addEmployee);
router.get('/', getEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
