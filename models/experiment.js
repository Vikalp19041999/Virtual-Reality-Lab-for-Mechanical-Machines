const mongoose = require('mongoose');
const { Schema } = mongoose

const experimentSchema = mongoose.Schema({
  aim: { type: String, required: true },
  description: { type: String, required: true },
  actual_result: { type: String, required: true },
  Machine: {
    type: Schema.Types.ObjectId,
    ref: 'Machine',
  },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

// Update the updated_at field on save
experimentSchema.pre('save', (next) => {
  this.updated_at = Date.now()
  next()
})

module.exports = Experiment = mongoose.model('Experiment', experimentSchema);