import express from 'express';
const router = express.Router();
import * as controller from './redo_workouts.controller';

router.post('/', controller.workoutRedo);
router.get('/', controller.getRedoWorkouts);

export = router;