const express = require('express');
const router = express.Router();
const Glass = require("../database/glasses")

/* GET Glass listing. */
router.get('/', async function(req, res, next) {
  const allGlasses = await Glass.findAll();
  res.send(allGlasses);
});

// continue from here

router.post('/', async function(req, res, next) {
  const { name, size } = req.body;

  if (!name || !size) {
    res.send('{ Missing Glass Info }');
    return;
  }

  const newGlass = await Glass.create({ name, size });

  res.send(newGlass);
});

router.get('/:id', async function(req, res, next) {
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
});

router.put('/:id', async function(req, res, next) {
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
});

router.patch('/:id', async function(req, res, next) {
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
});

router.delete('/:id', async function(req, res, next) {
  await Glass.destroy({
    where: { id: +req.params.id }
  });
  res.send(`GlassId ${req.params.id} dropped!`);
});

module.exports = router;