/**
 * Torkuma Ugbah
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';

let connection = undefined;

const ExerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true, enum: ['kgs', 'lbs'] },
    date: { type: String, required: true },
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

export async function createExercise(data) {
    const exercise = new Exercise(data);
    return await exercise.save();
}

export async function getAllExercises() {
    return await Exercise.find();
}

export async function getExerciseById(id) {
    return await Exercise.findById(id);
}

export async function updateExercise(id, data) {
    return await Exercise.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteExercise(id) {
    return await Exercise.findByIdAndDelete(id);
}

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

export { connect};