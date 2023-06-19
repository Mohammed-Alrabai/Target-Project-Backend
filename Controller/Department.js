const Department = require("../Models/department");
exports.createDepartment = async (req, res) => {
  const name = req.body.name;
  const newDepartment = new Department({
    name: name,
  });
  newDepartment.save().then((thenewDepartment)=>{
 res.status(200).json({
        result: thenewDepartment,
      });
  }).catch((error)=>{
   res.status(500).json({
        message: error,
      });
  })
 }

 exports.DepartmentList = async (req, res) => {
    Department.find().then((allDepartment)=>{
        res.status(200).json({
        result: allDepartment,
      });
    }).catch((error)=>{
   res.status(500).json({
        message: error,
      });
  })

    
 }