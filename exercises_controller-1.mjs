/**
 * Torkuma Ugbah
 */
import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';
import {
    createExercise,
    getAllExercises,
    getExerciseById,
    updateExercise,
    deleteExercise
} from './exercises_model.mjs';

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());


function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function isRequestBodyValid(body) {
    const allowedKeys = ['name', 'reps', 'weight', 'unit', 'date'];
    const bodyKeys = Object.keys(body);

    if (bodyKeys.length !== 5) return false;
    for (let key of allowedKeys) {
      if (!(key in body)) return false;
    }

    if (typeof body.name !== 'string' || body.name.trim() === '') return false;
    if (!Number.isInteger(body.reps) || body.reps <= 0) return false;
    if (!Number.isInteger(body.weight) || body.weight <= 0) return false;
    if (!['kgs', 'lbs'].includes(body.unit)) return false;
    if (!isDateValid(body.date)) return false;

    return true;
}

export const postExercise = asyncHandler(async (req, res) => {
    if (!isRequestBodyValid(req.body)) {
      return res.status(400).json({ Error: 'Invalid request'});
    }

    const result = await createExercise(req.body);
    res.status(201).json(result);
});

export const getExercises = asyncHandler(async (req, res) => {
    const results = await getAllExercises();
    res.status(200).json(results);
});

export const getExercise = asyncHandler(async (req, res) => {
    const result = await getExerciseById(req.params._id);
    if (!result) return res.status(404).json({ Error: 'Not found' });
    res.status(200).json(result);
});

export const putExercise = asyncHandler(async (req, res) => {
    if (!isRequestBodyValid(req.body)) {
       return res.status(400).json({ Error: 'Invalid request'});
    }

    const result = await updateExercise(req.params._id, req.body);
    if (!result) return res.status(404).json({ Error: 'Not found' });
    res.status(200).json(result);
});

export const deleteExerciseById = asyncHandler(async (req, res) => {
    const result = await deleteExercise(req.params._id);
    if (!result) return res.status(404).json({ Error: 'Not found' });
    res.status(204).send();
});

app.post('/exercises', postExercise);
app.get('/exercises', getExercises);
app.get('/exercises/:_id', getExercise);
app.put('/exercises/:_id', putExercise);
app.delete('/exercises/:_id', deleteExerciseById);

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});