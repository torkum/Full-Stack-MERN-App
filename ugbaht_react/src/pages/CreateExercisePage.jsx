import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function CreateExercisePage() {
    const navigate = useNavigate();
    const [exercise, setExercise] = useState({
        name: '', reps: '', weight: '', unit: 'kgs', date: ''
    });

    const create = async() => {
        const datePattern = /^(\d{2})-(\d{2})-(\d{2})$/;
        const match = exercise.date.match(datePattern);

        if (!match) {
            alert("Failed to create exercise: Status 400");
            navigate('/');
            return;
    }

        const month = parseInt(match[1], 10);
        const day = parseInt(match[2], 10);

        if (month < 1 || month > 12) {
            alert("Failed to create exercise: Status 400");
            navigate('/');
            return;
    }

        if (day < 1 || day > 31) {
            alert("Failed to create exercise: Status 400");
            navigate('/');
            return;
    }

    const exerciseToSubmit = {
        ...exercise,
        reps: parseInt(exercise.reps, 10),
        weight: parseInt(exercise.weight, 10),
        date: exercise.date,
    };

        const res = await fetch(`http://localhost:3000/exercises`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exerciseToSubmit),
        });

        if (res.status === 201) {
            alert('Exercise created!');
            navigate('/')
        } else {
            const text = await res.text();
            console.error('Error creating exercise:', res.status, text)
            alert('Failed to create exercise.');
            navigate('/');
        }

    };

    return (
        <main>
            <h2>Create Exercise</h2>
            <form onSubmit={e => { e.preventDefault(); create(); }}>
             <div className="form-row">
              <label>
                Name
                <input
                    name="name"
                    placeholder="Name"
                    value={exercise.name}
                    onChange={e => setExercise({ ...exercise, name: e.target.value})}
                    required
                />
              </label>

              <label>
                Reps
                <input
                    type="number"
                    name="reps"
                    placeholder="Reps"
                    value={exercise.reps}
                    onChange={e => { 
                        const val = e.target.value;
                        if (val === '' || /^[0-9\b]+$/.test(val)) {
                            setExercise({ ...exercise, reps: val});
                        }
                      }}
                    required
                />
              </label>

              <label>
                Weight
                <input
                    type="number"
                    name="weight"
                    placeholder="Weight"
                    value={exercise.weight}
                    onChange={e => {
                        const val =e.target.value;
                        if (val === '' || /^[0-9\b]+$/.test(val)) {
                            setExercise({ ...exercise, weight: val });
                        }
                       }}
                    required
                />
              </label>

              <label>
                Unit
                <select 
                    name="unit"
                    value={exercise.unit}
                    onChange={e => setExercise({ ...exercise, unit: e.target.value })}
                >
                    <option value="kgs">kgs</option>
                    <option value="lbs">lbs</option>
                </select>
               </label>

               <label>
                 Date
                <input
                    type="text"
                    name="date"
                    value={exercise.date}
                    onChange={e => setExercise({ ...exercise, date: e.target.value})}
                    required
                />
              </label>
            </div>
            
              <button type="submit">Create</button>
             </form>
        </main>
    );
}

export default CreateExercisePage;