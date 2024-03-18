const Prison = require('../model/prisonModel');

exports.getPrisons = async (req,res,next) => {
  try{
    const prisons = await Prison.findAll();
    res.status(200).json({
      status: 'success',
      data: prisons
    });
  }
  catch (err) {
    console.log(err);
  }
}

exports.getPrisonById = async (req, res, next) => {
  try{
    const prison = await Prison.findOne(req.params.id);
    if(prison.length === 0){
      res.status(404).json({
        status: 'failed',
        message: `prison with id ${req.params.id} does not exist`
      });
      return next();
    }
    res.status(200).json({
      status: 'success',
      data: prison
    });
  }
  catch (err) {
    console.log(err);
  }
}

exports.createPrison = async (req, res, next) => {
  try{
    const prison = new Prison(req.body);
    await prison.save(req.body);
    res.status(201).json({
      status:'success',
      data: prison
    });
    next();
  }
  catch (err) {
    console.log(err);
  }
}


exports.updatePrison = async (req,res,next) => {
  const prison = await Prison.findOne(req.params.id);
  const updatePrison = new Prison(prison[0]);
  
  if(req.body.prison_name) updatePrison.prison_name = req.body.prison_name
  if(req.body.address) updatePrison.address = req.body.address
  if(req.body.warden) updatePrison.warden = req.body.warden

  updatePrison.update();

  res.status(204).json({
    status: 'success',
    data: prison
  })
}

exports.deletePrison = async (req,res,next) => {
  await Prison.delete(req.params.id);
  res.status(204).json({status:"success"});
}