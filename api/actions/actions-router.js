// Write your "actions" router here!
const express = require('express');

const actionsModel = require('./actions-model');

const { validateActionId, validateAction } = require('./actions-middlware');

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

module.exports = router;
