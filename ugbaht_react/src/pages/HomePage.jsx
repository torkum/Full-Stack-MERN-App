import { useEffect, useState } from 'react';
import Table from '../components/Table';
import Navigation from '../components/Navigation';

function HomePage() {
    const [exercises, setExercises] = useState([]);

    const fetchExercises = async () => {
        const res = await fetch('http://localhost:3000/exercises');
        const data = await res.json();
        setExercises(data);
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    return (
        <main>
            <Table exercises={exercises} onDelete={fetchExercises} />
        </main>
    );
}


export default HomePage