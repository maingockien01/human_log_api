import express from 'express';
import apiKey from './auth/apiKey';
import { tagRouter } from './tag';
import { logRouter } from './log';

export const router = express.Router();


router.use('/', apiKey);

//--------------------------------------
// Routes below use api key validator
//--------------------------------------

router.use('/tags', tagRouter);

router.use('/logs', logRouter)