const Glass = require("../database/glasses");

const getAllGlasses = async (req, res, next) => {
  const allGlasses = await Glass.findAll();
  res.send(allGlasses);
}

const createOneGlass = async (req, res, next) => {
  const { name, size } = req.body;

  if (!name || !size) {
    res.send('{ Missing Glass Info }');
    return;
  }

  const newGlass = await Glass.create({ name, size });

  res.send(newGlass);
}

const getOneGlass = async (req, res, next) => {
  const [Glass] = await Glass.findAll({ // this to make sure the glass even exits
    where: {
      id: +req.params.id
    }
  });
  if(!Glass) {
    res.send(`GlassID ${req.params.id} does not Exits`);
    return;
  }

  res.send(Glass);
}

const putOneGlass = async (req, res, next) => {
  const [Glass] = await Glass.findAll({ // this to make sure the glass even exits
    where: {
      id: +req.params.id
    }
  });
  if(!Glass) {
    res.send(`GlassID ${req.params.id} does not Exits`);
    return;
  }

  await Glass.update(req.body, {where: {
    id: req.params.id
  }})

  const overWrittenGlass = await Glass.findAll({where: { id: req.params.id}})
  res.send(overWrittenGlass)
}

const patchOneGlass = async (req, res, next) => {
  const [Glass] = await Glass.findAll({ // this to make sure the glass even exits
    where: {
      id: +req.params.id
    }
  });
  if(!Glass) {
    res.send(`GlassID ${req.params.id} does not Exits`);
    return;
  }

 await Glass.update(req.body, { where: { id: req.params.id}})
 updatedGlass = await Glass.findAll( { where: { id: req.params.id } })
  res.send(updatedGlass);
}

const deleteOneGlass = async (req, res, next) => {
  await Glass.destroy({
    where: { id: +req.params.id }
  });
  res.send(`GlassId ${req.params.id} dropped!`);
}

module.exports = {
  getAllGlasses,
  createOneGlass,
  getOneGlass,
  putOneGlass,
  patchOneGlass,
  deleteOneGlass
}
