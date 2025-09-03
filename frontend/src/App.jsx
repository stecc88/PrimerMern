import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilters from "./components/TaskFilters";

const BACKEND_URL = import.meta.env.VITE_API_URL; // ← desde .env

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(BACKEND_URL);
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error('Error al obtener tareas:', err);
      setError('No se pudieron cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (text) => {
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error('Error al agregar tarea:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error al eliminar tarea:', err);
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = tasks.find(t => t._id === id);
      const response = await fetch(`${BACKEND_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed })
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(t => t._id === id ? updatedTask : t));
    } catch (err) {
      console.error('Error al actualizar tarea:', err);
    }
  };

  const editTask = async (id, newText) => {
    try {
      const response = await fetch(`${BACKEND_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText })
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(t => t._id === id ? updatedTask : t));
    } catch (err) {
      console.error('Error al editar tarea:', err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeTasksCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 py-4 md:py-8 px-2 md:px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 gradient-text">
          Lista de Tareas 📋
        </h1>

        {loading && <p className="text-center text-purple-200">Cargando tareas...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        <TaskForm addTask={addTask} />
        <div className="text-center mb-4 md:mb-6">
          <p className="text-sm md:text-base text-purple-200">
            Tareas activas: {activeTasksCount}
          </p>
        </div>
        <TaskFilters filter={filter} setFilter={setFilter} />
        <TaskList 
          tasks={filteredTasks} 
          onDelete={deleteTask} 
          onToggle={toggleTask}
          onEdit={editTask}
        />
      </div>
    </div>
  );
}

export default App;
