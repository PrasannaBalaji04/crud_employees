const express = require('express');
const router = express.Router();
const {
  addEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const { get } = require('mongoose');

router.post('/add', addEmployee);
router.get('/',getEmployees);
router.get('/:id', getEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
