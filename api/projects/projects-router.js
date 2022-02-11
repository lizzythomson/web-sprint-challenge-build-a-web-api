// Write your "projects" router here!
const express = require('express');
const projectsModel = require('./projects-model');
const {
  validateProjectId,
  validateProject,
  validateUpdatedProject,
} = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
  projectsModel
    .get()
    .then((projects) => {
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

router.put('/:id', validateProjectId, validateUpdatedProject, (req, res) => {
  const { id } = req.params;
  projectsModel
    .update(id, req.body)
    .then((updatedProject) => {
      res.json(updatedProject);
    })
    .catch(() => {
      res.status(500).json({
        message: 'There was an error while saving the updated project',
      });
    });
});

router.delete('/:id', validateProjectId, async (req, res) => {
  const { id } = req.params;
  const projectToDelete = await projectsModel.get(id);
  projectsModel
    .remove(id)
    .then(() => {
      res.json(projectToDelete);
    })
    .catch(() => {
      res.status(500).json({ message: 'Error deleting the project' });
    });
});

router.get('/:id/actions', validateProjectId, async (req, res) => {
  try {
    const { id } = req.params;
    const projectActions = await projectsModel.getProjectActions(id);
    res.json(projectActions);
  } catch (error) {
    res.status(500).json({ Message: `Error retrieving project's actions` });
  }
});

module.exports = router;
