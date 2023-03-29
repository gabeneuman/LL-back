import express from 'express';
const router = express.Router();
import * as controller from './workout.controller';

router.post('/create', controller.createWorkout);
router.get('/', controller.getWorkouts);
router.get('/completed', controller.getCompletedWorkouts);
router.get('/:id', controller.getWorkoutById);
router.put('/:id', controller.updateWorkoutById);
router.put('/delete/:id', controller.deleteWorkoutById);

router.post('/explore', controller.getAllWorkouts);
router.get('/explore/search', controller.getAllWorkoutsByName);

export = router;