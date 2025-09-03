const mongoose = require('mongoose');

// Defino el esquema de la tarea: texto obligatorio, estado de completado y fecha de creación
const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Exporto el modelo para poder usarlo en las rutas del servidor
module.exports = mongoose.model('Task', TaskSchema);