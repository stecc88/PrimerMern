import { useState } from 'react';

function TaskForm({ addTask }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nueva tarea"
          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-purple-800/50 border border-purple-600 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
        />
        <button 
          type="submit"
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-orange-600 transition-all transform hover:scale-105 text-sm sm:text-base"
        >
          Agregar ✏️
        </button>
      </div>
    </form>
  );
}

export default TaskForm;