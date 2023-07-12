const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  designation: { type: String, required: true },
  mobile : {type: Number, required : false}
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;