import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function EditExercisePage() {
    const { state } = useLocation();
    const navigate =  useNavigate();
    const [exercise, setExercise] = useState(state.exercise);

    const update = async () => {
        if (!exercise._id) {
            console.error("Missing exercise._id", exercise);
            alert("Missing exercise ID.");
            navigate('/');
            return;
        }

        const datePattern = /^(\d{2})-(\d{2})-(\d{2})$/;
        const match = exercise.date.match(datePattern);

        if (!match) {
            alert("Failed to update exercise: status 400.");
            navigate('/');
            return;
        }

        const month = parseInt(match[1], 10);
        const day = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);

        if (month < 1 || month > 12) {
            alert("Failed to update exercise: Status 400.")
            navigate('/');
            return;
        }

        if (day < 1 || day > 31) {
            alert("Failed to update exercise: Status 400.");
            navigate('/');
            return;
        }

    const { name, reps, weight, unit, date } = exercise;

    const exerciseToSubmit = {
        name,
        reps: parseInt(exercise.reps || 0, 10),
        weight: parseInt(exercise.weight || 0, 10),
        unit,
        date: exercise.date.slice(0, 10),
    };

        console.log("Request body:", JSON.stringify(exerciseToSubmit, null, 2));

        const res = await fetch(`http://localhost:3000/exercises/${exercise._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exerciseToSubmit),
        });

        if (res.status === 200) {
            alert('Exercise updated!');
            navigate('/');
        } else {
            const text = await res.text();
            console.error('Update failed', res.status, text)
            alert(`Update failed. ${res.status}`);
        }

        navigate('/');
    };

       return (
        <main>
            <h2>Edit Exercise</h2>
            <form onSubmit={e => { e.preventDefault(); update(); }}>
             <div className="form-row">
               <label>
                Name:
                <input
                    name="name"
                    placeholder="Name"
                    value={exercise.name}
                    onChange={e => setExercise({ ...exercise, name: e.target.value})}
                    required
                />
              </label>

              <label>
                Reps:
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
                Weight:
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
                Unit:
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
                 Date:
                <input
                    type="text"
                    value={exercise.date.slice(0, 10)}
                    onChange={e => setExercise({ ...exercise, date: e.target.value})}
                />
              </label>
            </div>


                <button type="submit">Update</button>
            </form>
        </main>
    );
}

export default EditExercisePage;