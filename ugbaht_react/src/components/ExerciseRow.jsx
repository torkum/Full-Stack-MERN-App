import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ExerciseRow({ exercise, onDelete }) {
    const navigate = useNavigate();

    if (!exercise || !exercise.name) return null;

    const handleDelete = async () => {
        await fetch(`/exercises/${exercise._id}`, { method: 'DELETE' });
        onDelete();
    };

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>
                <FaEdit onClick={() => navigate(`/edit/${exercise._id}`, { state: { exercise } })} />
                <FaTrash onClick={handleDelete} />
            </td>
        </tr>
    );
}

export default ExerciseRow;