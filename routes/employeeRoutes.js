const express = require('express');
const { authenticateToken } = require('../middlewares/authenticate');
const router = express.Router();
const {
  addEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  refresh,
  signUp,
  login
} = require('../controllers/employeeController');
const { get } = require('mongoose');

router.post('/add', authenticateToken, addEmployee);
router.get('/', authenticateToken,getEmployees);
router.get('/', authenticateToken, getEmployee);
router.put('/:id', authenticateToken, updateEmployee);
router.delete('/:id', authenticateToken, deleteEmployee);
router.post('/refresh', refresh);
router.post('/register', signUp);
router.post('/login', login);

module.exports = router;
