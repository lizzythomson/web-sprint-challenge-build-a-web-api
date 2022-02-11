// Write your "projects" router here!
const express = require('express');
const projectsModel = require('./projects-model');
const { validateProjectId, validateProject } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
  projectsModel
    .get()
    .then((projects) => {
      console.log(projects);
      res.json(projects);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The projects information could not be retrieved' });
    });
});

router.get('/:id', validateProjectId, (req, res) => {
  try {
    res.json(req.project);
  } catch (error) {
    res.status(500).json({ Message: 'Error retrieving project' });
  }
});

router.post('/', validateProject, (req, res) => {
  projectsModel
    .insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(() => {
      res.status(500).json({
        message: 'There was an error while saving the project to the database',
      });
    });
});

module.exports = router;
