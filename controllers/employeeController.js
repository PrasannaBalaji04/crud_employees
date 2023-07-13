const Employee = require('../models/employee');
var mongoose = require('mongoose');

// Add employee details to the database
async function addEmployee(req, res) {
  try {
    const employee = await Employee.create(req.body);
    console.log(employee);
    res.status(201).json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


// Get employee details
async function getEmployees(req, res) {
  try {
    const employees = await Employee.find();
    res.json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
//get employee
async function getEmployee(req, res) {
  try {
    console.log(req.params.id);
    if(!mongoose.Types.ObjectId.isValid(req.params.id) ){
      res.status(400).json({ success: false, error: "Id field is not valid" });
    }else{
      const employees = await Employee.findById(req.params.id);
      res.json({ success: true, data: employees });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
// Update employee details
async function updateEmployee(req, res) {
  try {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      res.status(400).json({ success: false, error: "Id field is empty" });
    }else{
      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json({ success: true, data: employee });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

// Delete an employee
async function deleteEmployee(req, res) {
  try {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    console.log("Id is empty");
    res.status(400).json({ success: false, error: "Id field is empty"});
  }else{
    await Employee.findByIdAndRemove(req.params.id);
    res.json({ success: true, message: 'Employee deleted successfully' });
  }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}


module.exports = {
  addEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
};
