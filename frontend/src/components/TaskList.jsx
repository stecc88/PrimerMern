import { useState } from 'react';

function TaskList({ tasks, onDelete, onToggle, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const startEditing = (task) => {
    setEditingId(task._id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      onEdit(editingId, editText);
    }
    setEditingId(null);
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {tasks.map(task => (
        <div 
          key={task._id} 
          className={`task-card p-3 md:p-4 rounded-xl shadow-lg transition-all duration-300 ${
            task.completed 
              ? 'bg-gradient-to-r from-purple-900/30 to-orange-900/30 border-orange-500/30' 
              : 'bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border-purple-500/30'
          } border`}
        >
          {editingId === task._id ? (
            <div className="flex flex-col gap-2 md:gap-2 md:flex-row">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-purple-800/50 border border-purple-600 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
                autoFocus
              />
              <button 
                onClick={saveEdit}
                className="px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all text-sm md:text-base"
              >
                Guardar
              </button>
              <button 
                onClick={() => setEditingId(null)}
                className="px-3 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all text-sm md:text-base"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task._id)}
                className="w-5 h-5 md:w-6 md:h-6 text-orange-500 rounded focus:ring-orange-500"
              />
              <span className={`text-base md:text-lg ${task.completed ? 'line-through text-orange-300' : 'text-white'}`}>
                {task.text}
              </span>
            </div>
          )}
          <div className="flex gap-2 mt-2 md:mt-0">
            {editingId !== task._id && (
              <button 
                onClick={() => startEditing(task)}
                className="p-1.5 md:p-2 text-purple-300 hover:text-purple-100 transition-colors"
              >
                ✏️
              </button>
            )}
            <button 
              onClick={() => onDelete(task._id)}
              className="p-1.5 md:p-2 text-red-400 hover:text-red-300 transition-colors"
            >
              ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;