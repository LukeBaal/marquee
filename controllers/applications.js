const Application = require('../model/Application');
const Category = require('../model/Category');


// @desc  Get all applications
// @route GET /api/v1/applications
// @access Public
exports.getAllApplications = async (req, res, _next) => {
  try {
    const applications = await Application.findAll({
      include: Category
    });
    res.status(200).json({ success: true, data: applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, reason: "Unknown error has occured" });
  }
}

// @desc  Get application
// @route GET /api/v1/applications/:id
// @access Public
exports.getOneApplication = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const application = await Application.findOne({
      include: Category,
      where: { id }
    });
    res.status(200).json({ success: true, data: application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, reason: "Unknown error has occured" });
  }
}

// @desc  Add a new application
// @route POST /api/v1/applications
// @access Public
exports.addApplication = async (req, res, _next) => {
  try {
    const { name, url, icon, iconType, tag, CategoryId, active, hidden } = req.body;

    if (!name || name.length == 0) {
      res.status(400).json({ success: false, reason: 'Application name required' });
      return;
    }
    if (!url || url.length == 0) {
      res.status(400).json({ success: false, reason: 'Application url required' });
      return;
    }

    let newApplication = {
      name,
      url,
      icon,
      iconType,
      tag,
      CategoryId,
      active,
      hidden
    };
    console.log(newApplication)
    newApplication = await Application.create(newApplication);
    res.status(201).json({ success: true, data: newApplication });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, reason: "Unknown error has occured" });
  }
}

// @desc  Update application
// @route PUT /api/v1/applications/:id
// @access Public
exports.updateApplication = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { name, url, icon, iconType, tag, active, hidden, CategoryId } = req.body;

    const application = {
      name,
      url,
      icon,
      iconType,
      tag,
      active,
      hidden,
      CategoryId
    };

    const numUpdated = await Application.update(application, {
      where: { id }
    });
    if (numUpdated == 0) {
      res.status(400).json({ success: false, data: 'Invalid applicationId' });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, reason: "Unknown error has occured" });
  }
}

// @desc  Delete application
// @route DELETE /api/v1/applications/:id
// @access Public
exports.deleteApplication = async (req, res, _next) => {
  try {
    const { id } = req.params;

    const numDeleted = await Application.destroy({
      where: { id }
    });

    if (numDeleted == 0) {
      res.status(400).json({ success: false, data: 'Invalid applicationId' });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, reason: "Unknown error has occured" });
  }
}



