function TaskFilters({ filter, setFilter }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
      <button 
        onClick={() => setFilter('all')}
        className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold transition-all text-sm md:text-base ${
          filter === 'all' 
            ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-lg' 
            : 'bg-purple-800/50 text-purple-200 hover:bg-purple-700/50'
        }`}
      >
        Todas
      </button>
      <button 
        onClick={() => setFilter('active')}
        className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold transition-all text-sm md:text-base ${
          filter === 'active' 
            ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-lg' 
            : 'bg-purple-800/50 text-purple-200 hover:bg-purple-700/50'
        }`}
      >
        Activas
      </button>
      <button 
        onClick={() => setFilter('completed')}
        className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold transition-all text-sm md:text-base ${
          filter === 'completed' 
            ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-lg' 
            : 'bg-purple-800/50 text-purple-200 hover:bg-purple-700/50'
        }`}
      >
        Completadas
      </button>
    </div>
  );
}

export default TaskFilters;