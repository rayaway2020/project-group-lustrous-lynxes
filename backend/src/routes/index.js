import express from 'express';

const router = express.Router();

import api from '../routes/api/index.js';
router.use('/api', api);

export default router;
