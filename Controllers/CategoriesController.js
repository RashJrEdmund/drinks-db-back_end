const Category = require("../database/categories");

const getAllCategories = async (req, res, next) => {
  const allCategorys = await Category.findAll();
  res.send(allCategorys);
}

const createOneCategory = async (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.send('{ Missing Category Info }');
    return;
  }

  const newCategory = await Category.create({ name, description });

  res.send(newCategory);
}

const getOneCategory = async (req, res, next) => {
  const [category] = await Category.findAll({ // this to check if the category even exits
    where: {
      id: +req.params.id
    }
  });
  if(!category) {
    res.send(`CategoryID ${req.params.id} does not Exits`);
    return;
  }

  res.send(category);
}

const putOneCategory = async (req, res, next) => {
  const [category] = await Category.findAll({ // this to check if the category even exits
    where: {
      id: +req.params.id
    }
  });
  if(!category) {
    res.send(`CategoryID ${req.params.id} does not Exits`);
    return;
  }

  await Category.update(req.body, {where: {
    id: req.params.id
  }})

  const overWrittenCategory = await Category.findAll({where: { id: req.params.id}})
  res.send(overWrittenCategory)
}

const patchOneCategory = async (req, res, next) => {
  const [category] = await Category.findAll({ // this to check if the category even exits
    where: {
      id: +req.params.id
    }
  });
  if(!category) {
    res.send(`CategoryID ${req.params.id} does not Exits`);
    return;
  }

 await Category.update(req.body, { where: { id: req.params.id}})
 updatedCategory = await Category.findAll( { where: { id: req.params.id } })
  res.send(updatedCategory);
}

const deleteOneCategory = async (req, res, next) => {
  await Category.destroy({
    where: { id: +req.params.id }
  });
  res.send(`CategoryId ${req.params.id} dropped!`);
}

module.exports = {
  getAllCategories,
  createOneCategory,
  getOneCategory,
  putOneCategory,
  patchOneCategory,
  deleteOneCategory
}
