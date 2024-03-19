const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const validator = require('validator');

const signToken = (id) => jwt.sign({id}, process.env.SALT, {expiresIn: process.env.JWT_EXPIRES_IN});
const createToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60 //Replace with env var here
    ),
    httpOnly: true
  }
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: user
  });
}

exports.signup = async (req,res,next) => {
  if(!req.body.name){
    res.status(403).json({
      status:'failed',
      message:'Please give a name'
    });
    return next();
  }
  if(!validator.isEmail(req.body.email)){
    res.status(403).json({
      status:'failed',
      message:'Please give a valid email'
    });
  }
  if(req.body.password != req.body.passwordConfirm){
    res.status(403).json({
      status:'failed',
      message:'password and passwordConfirm do not match.'
    });
    return next();
  }
  req.body.password = await bcrypt.hash(req.body.password, 12);
  let user;
  if(req.body.aadhar){
    user = new User(req.body.name, req.body.email, req.body.password, req.body.aadhar);
  }
  else{
    user = new User(req.body.name, req.body.email, req.body.password);
  }
  await user.save();
  user = await User.findOneByEmail(user.email);
  return createToken(user[0], 201, res);
}

exports.login = async (req,res,next) => {
  console.log(req.body);
  const user = await User.findOneByEmail(req.body.email);
  if(!user[0] || !(await bcrypt.compare(req.body.password, user[0].password))){
    res.status(401).json({
      status: 'failed',
      message: 'Invalid email or password'
    });
    return next();
  };
  return createToken(user[0], 200, res);
}

exports.protect = async (req,res,next) => {
  //1)Get token and check if it exist
  try{
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      res.status(403).json({
        status: 'failed',
        message: 'Please login first'
      })
    }
    const decoded = await promisify(jwt.verify)(token, process.env.SALT);
    const user = await User.findOne(decoded.id);
    // console.log(decoded);
    // console.log(user)
    user[0].password = undefined;
    req.user = user[0];
    res.locals.user = user[0];
    if(!user[0]){
      return next(new Error('No user'));
    }
    next();
    }
  catch(err){
    return next(err);
  }
}

exports.restrict = (...roles) => (req,res,next) => {
  if(!roles.includes(req.user.role)){
    return next(new Error('You do not have access to this route.'));
  }
  next();
}