const Case = require('../model/caseModel');

exports.getCases = async (req,res,next) => {
  try{
    const cases = await Case.findAll();
    res.status(200).json({
      status: 'success',
      data: cases
    });
  }
  catch (err) {
    console.log(err);
  }
}

exports.getCaseById = async (req, res, next) => {
  try{
    const cases = await Case.findOne(req.params.id);
    if(cases.length === 0){
      res.status(404).json({
        status: 'failed',
        message: `case with id ${req.params.id} does not exist`
      });
      return next();
    }
    res.status(200).json({
      status: 'success',
      data: cases
    });
  }
  catch (err) {
    console.log(err);
  }
}

exports.createCase = async (req, res, next) => {
  try{
    const cases = new Case(req.body);
    await cases.save(req.body);
    res.status(201).json({
      status:'success',
      data: cases
    });
    next();
  }
  catch (err) {
    console.log(err);
  }
}


exports.updateCase = async (req,res,next) => {
  const cases = await Case.findOne(req.body.case_id);
  res.status(204).json({
    status: 'success',
    data: cases
  })
}