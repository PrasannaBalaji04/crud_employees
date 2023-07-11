const Employee = require('../models/employee');

// Add employee details to the database
async function addEmployee(req, res) {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Get employee details
async function getEmployee(req, res) {
  try {
    const employees = await Employee.find();
    res.json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Update employee details
async function updateEmployee(req, res) {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Delete an employee
async function deleteEmployee(req, res) {
  try {
    await Employee.findByIdAndRemove(req.params.id);
    res.json({ success: true, message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  addEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee
};
