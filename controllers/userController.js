const User = require('../model/userModel');


exports.getAllUser = async (req,res,next) => {
  const result = await User.findAll();
  res.status(200).json({
    status: 'success',
    data: result
  })
}
exports.getUser = async (req,res,next) => {
  const result = await User.findOne(req.params.id);
  res.status(200).json({
    status: 'success',
    data: result
  })
}

exports.createUser = async (req,res,next) => {
  // Done in authController
}

exports.updateUser = async (req,res,next) => {
  if(req.body.password){
    res.status(403).json({
      status:'failed',
      message: 'Please use /resetPassword for changing password'
    });
    return next();
  }
  const user = await User.findOne(req.params.id);
  if (req.body.name) user[0].name = req.body.name;
  if (req.body.email) user[0].email = req.body.email;
  if (req.body.aadhar) user[0].aadhar = req.body.aadhar;
  await User.update(req.params.id, user[0]);
  res.status(204).json({});
}