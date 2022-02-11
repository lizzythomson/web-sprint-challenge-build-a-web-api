// add middlewares here related to projects
const projectsModel = require('./projects-model');

module.exports = {
  validateProjectId,
  validateProject,
  validateUpdatedProject,
};

async function validateProjectId(req, res, next) {
  const id = req.params.id;
  const result = await projectsModel.get(id);
  if (!result) {
    res.status(404).json({ message: 'project not found' });
  } else {
    req.project = result;
    next();
  }
}

function validateProject(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: 'name and description are required' });
  } else {
    next();
  }
}

function validateUpdatedProject(req, res, next) {
  if (
    !req.body.name ||
    !req.body.description ||
    req.body.completed === undefined
  ) {
    res
      .status(400)
      .json({ message: 'name, description, and completed are required' });
  } else {
    next();
  }
}
