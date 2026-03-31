import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InputCreate = ({fetchData}) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const urlApi = 'http://localhost:3000/create';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError("La tarea no puede estar vacía")
            return;
        }

        try {
            const response = await fetch(urlApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({title}),
            })

            if (!response.ok) {
                throw new Error("Error al crear la tarea");
            }

            setTitle("");
            setError("");

            await fetchData();
            navigate("/");

        } catch (err) {
        console.error(err);
        setError("No se pudo crear la tarea");
        }
    }; 
    return (
        <>
        <div style={{padding: '20px'}}>
            <h2>Nueva tarea</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Escribe una tarea"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{padding: '8px', marginRight: '10px', width: '250px'}}
                />
                <button type="submit">Enviar</button>
            </form>
            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
        </>
    );
}

export default InputCreate;