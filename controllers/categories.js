const Category = require('../model/Category');
const { v4 } = require('uuid');
const uuidv4 = v4;

// @desc  Get all categories
// @route GET /api/v1/categories
// @access Public
exports.getAllCategories = async (req, res, _next) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, reason: "Unknown error has occured" });
  }
}

// @desc  Add a new category
// @route POST /api/v1/categories
// @access Public
exports.addCategory = async (req, res, _next) => {
  try {
    const { name, icon, iconType } = req.body;

    if (!name || name.length == 0) {
      res.status(400).json({ success: false, reason: 'Category name required' });
      return;
    }

    let newCategory = {
      id: uuidv4(),
      name,
      icon,
      iconType
    }

    newCategory = await Category.create(newCategory);
    res.status(201).json({ success: true, data: newCategory });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, reason: "Unknown error has occured" });
  }
}

// @desc  Update category
// @route PUT /api/v1/categories/:id
// @access Public
exports.updateCategory = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { name, icon, iconType } = req.body;

    if (!id || id.length == 0) {
      res.status(400).json({ success: false, reason: 'Invalid categoryId' });
      return;
    }

    let newValues = {
      name,
      icon,
      iconType
    };

    const numUpdated = await Category.update(newValues,
    {
      where: {
        id
      }
    })

    if (numUpdated == 0) {
      res.status(400).json({ success: false, reason: 'Invalid categoryId' });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, reason: "Unknown error has occured" });
  }
}

// @desc  Delete category
// @route DELETE /api/v1/categories/:id
// @access Public
exports.deleteCategory = async (req, res, _next) => {
  try {
    const { id } = req.params;

    if (!id || id.length == 0) {
      res.status(400).json({ success: false, reason: 'Invalid categoryId' });
      return;
    }

    const numDeleted = await Category.destroy({
      where: {
        id
      }
    })

    if (numDeleted == 0) {
      res.status(400).json({ success: false, reason: 'Invalid categoryId' });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, reason: "Unknown error has occured" });
  }
}

