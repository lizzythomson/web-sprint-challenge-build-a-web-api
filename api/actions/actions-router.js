// Write your "actions" router here!
const express = require('express');

const actionsModel = require('./actions-model');

const {
  validateActionId,
  validateAction,
  validateUpdatedAction,
} = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res) => {
  actionsModel
    .get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Yikes! Error retrieving actions. Please try again later',
      });
    });
});

router.get('/:id', validateActionId, (req, res) => {
  try {
    res.json(req.action);
  } catch (error) {
    res.status(500).json({ Message: 'Error retrieving action' });
  }
});

router.post('/', validateAction, (req, res) => {
  actionsModel
    .insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch(() => {
      res.status(500).json({
        message: 'There was an error while saving the action to the database',
      });
    });
});

router.put('/:id', validateActionId, validateUpdatedAction, (req, res) => {
  const { id } = req.params;
  actionsModel
    .update(id, req.body)
    .then((updatedAction) => {
      res.json(updatedAction);
    })
    .catch(() => {
      res.status(500).json({
        message: 'There was an error while saving the updated action',
      });
    });
});

router.delete('/:id', validateActionId, async (req, res) => {
  const { id } = req.params;
  const actionToDelete = await actionsModel.get(id);
  actionsModel
    .remove(id)
    .then(() => {
      res.json(actionToDelete);
    })
    .catch(() => {
      res.status(500).json({ message: 'Error deleting the action' });
    });
});

module.exports = router;
