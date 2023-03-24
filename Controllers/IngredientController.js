const Ingredient = require("../database/ingredients");

const getAllIngredients = async (req, res, next) => {
  const allIngredientes = await Ingredient.findAll();
  res.send(allIngredientes);
};

const createOnIngredient = async (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.send('{ Missing Ingredient Info }');
    return;
  }

  const newIngredient = await Ingredient.create({ name, description });

  res.send(newIngredient);
}

const getOneIngredient = async (req, res, next) => {
  const [ingredient] = await Ingredient.findAll({ // this to make sure the ingredient exits
    where: {
      id: +req.params.id
    }
  });

  if(!ingredient) {
    res.send(`IngredientID ${req.params.id} does not Exits`);
    return;
  }

  res.send(ingredient);
}

const putOneIngredient = async (req, res, next) => {
  const [ingredient] = await Ingredient.findAll({ // this to make sure the ingredient exits
    where: {
      id: +req.params.id
    }
  });

  if(!ingredient) {
    res.send(`IngredientID ${req.params.id} does not Exits`);
    return;
  }

  await Ingredient.update(req.body, {where: {
    id: req.params.id
  }})

  const overWrittenIngredient = await Ingredient.findAll({where: { id: req.params.id}})
  res.send(overWrittenIngredient)
}

const patchOneIngredient = async (req, res, next) => {
  const [ingredient] = await Ingredient.findAll({ // this to make sure the ingredient exits
    where: {
      id: +req.params.id
    }
  });

  if(!ingredient) {
    res.send(`IngredientID ${req.params.id} does not Exits`);
    return;
  }

 await Ingredient.update(req.body, { where: { id: req.params.id}})
 updatedIngredient = await Ingredient.findAll( { where: { id: req.params.id } })
  res.send(updatedIngredient);
}

const deleteOneIngredient = async (req, res, next) => {
  await Ingredient.destroy({
    where: { id: +req.params.id }
  });
  res.send(`IngredientId ${req.params.id} dropped!`);
}

module.exports = {
  getAllIngredients,
  createOnIngredient,
  getOneIngredient,
  putOneIngredient,
  patchOneIngredient,
  deleteOneIngredient
}
