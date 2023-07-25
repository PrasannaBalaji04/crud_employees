const Employee = require('../models/employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{validateEmail, validatePassword} = require('../service/validators');
var mongoose = require('mongoose');


// Sign Up employee to the db
async function signUp(req,res){
  try {
    
    const { name, email, password, age , gender, address, designation, mobile } = req.body; //try mobile also
    if (!validateEmail(email)) {
      console.log("email not valid");
      return res.status(400).json({ error: 'Invalid email address' });
    }
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      console.log("password not valid");
      return res.status(400).json({ error: 'Invalid password', passwordErrors });
    }

    // Check if the email is already registered
    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new employee with the encrypted password
    const employee = await Employee.create({
      name,
      email,
      password : hashedPassword,
      age,
      gender,
      address,
      designation,
      token,
      mobile
    });

    res.status(201).json({ success: true, message: 'User created successfully' });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Log in a user and generate a JWT token
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find the employee by email
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: employee._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({id : employee._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1D'});
    employee.updateOne()
    res.cookie('jwt', refreshToken, { httpOnly: true, 
      maxAge: 24 * 60 * 60 * 1000 });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Refresh token
async function refresh(req, res){
  // console.log("Hi");

  if (req.cookies?.jwt) {
    // console.log("called");


    // Destructuring refreshToken from cookie
    const refreshToken = req.cookies.jwt;
    // console.log(refreshToken);

    // Verifying refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, 
    (err, decoded) => {
        if (err) {

            // Wrong Refesh Token
            return res.status(406).json({ message: 'Unauthorized' });
        }
        else {
            // Correct token we send a new access token
            const accessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            return res.json({ accessToken });
        }
    })
    } else {
        return res.status(406).json({ message: 'Unauthorized' });
    }
}

// Add employee details to the database
async function addEmployee(req, res) {
  try {
    const email = req.body.email;
    const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        console.log('USER ALREADY REGISTERED');
        res.status(400).json({success: false, error: 'Employee already registered'}); // Bad request - 400
      }
     else{ 
      const employee = await Employee.create(req.body);
      console.log(employee);
      res.status(201).json({ success: true, data: employee });
     }
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
  deleteEmployee,
  refresh,
  signUp,
  login
};
