import express from 'express';
const router = express.Router();
import * as controller from './user.controller';

router.post('/register', controller.createUser);
router.post('/login', controller.login);
router.get('/me', controller.getUser);
router.put('/me', controller.updateUser);

export = router;