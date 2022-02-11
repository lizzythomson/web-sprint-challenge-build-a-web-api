// add middlewares here related to actions
const actionsModel = require('./actions-model');

module.exports = {
  validateActionId,
  validateAction,
};

async function validateActionId(req, res, next) {
  const id = req.params.id;
  const result = await actionsModel.get(id);
  if (!result) {
    res.status(404).json({ message: 'action not found' });
  } else {
    req.action = result;
    next();
  }
}

function validateAction(req, res, next) {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({
      message: 'project_id, description, and notes are required fields',
    });
  } else {
    next();
  }
}
