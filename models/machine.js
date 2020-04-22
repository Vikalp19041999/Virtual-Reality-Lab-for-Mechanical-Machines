const mongoose = require('mongoose');

const machineSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

// Update the updated_at field on save
machineSchema.pre('save', (next) => {
  this.updated_at = Date.now()
  next()
})

module.exports = Machine = mongoose.model('Machine', machineSchema);