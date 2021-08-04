import express, { Router } from 'express';
import tagRepo from '../../database/tag/tag.repo'
import { dtoValidateMiddleware } from '../../core/middlewares/';
import { CreateTagDTO } from './create.tag.dto';

export const tagRouter = express.Router();

//Add/Update tag
tagRouter.post('/', dtoValidateMiddleware(CreateTagDTO),  (req, res) => {
    const input = req.body;

    tagRepo.create(input, {'_id': '1', 'apiKey': '2506'})
    res.json({data: 'This is tag endpoints adding'})
});

//Get all tags of users
tagRouter.get('/', (req, res) => {
    res.send('return all tags of users')
})


//Get a specified tag
tagRouter.get('/:tagId', (req, res) => {
    const tagId = req.params.tagId;
    res.json({data: tagId})
})