const fs = require('fs')
const path = require('path')

exports.getCase = (req,res,next) => {
  try{
    res.status(200).render('../views/caseViewer.pug');
  }
  catch(err){
    res.status(500).json({
      status: 'failed',
      error: err
    })
  }
}
exports.getHome = (req,res,next) => {
  try{
    res.status(200).render('../views/home.pug');
  }
  catch(err){
    res.status(500).json({
      status: 'failed',
      error: err
    })
  }
}
exports.getPrisoner = (req,res,next) => {
  try{
    res.status(200).render('../views/prisonerViewer.pug');
  }
  catch(err){
    res.status(500).json({
      status: 'failed',
      error: err
    })
  }
}
exports.getPrison = (req,res,next) => {
  try{
    res.status(200).render('../views/prisonViewer.pug');
  }
  catch(err){
    res.status(500).json({
      status: 'failed',
      error: err
    })
  }
}
exports.getLogin = (req,res,next) => {
  try{
    res.status(200).render('../views/login.pug');
  }
  catch(err){
    res.status(500).json({
      status: 'failed',
      error: err
    })
  }
}
exports.getSignup = (req,res,next) => {
  try{
    res.status(200).render('../views/signUp.pug');
  }
  catch(err){
    res.status(500).json({
      status: 'failed',
      error: err
    })
  }
}
exports.getUser = (req,res,next) => {
  try{
    res.status(200).render('../views/userViewer.pug');
  }
  catch(err){
    res.status(500).json({
      status: 'failed',
      error: err
    })
  }
}



