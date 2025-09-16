import ExerciseRow from './ExerciseRow';

function Table({ exercises, onDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map(ex => (
                    <ExerciseRow key={ex._id} exercise={ex} onDelete={onDelete} />
                ))}
            </tbody>
        </table>
    );
}

export default Table;