const mongoose = require('mongoose');
const { Schema } = mongoose

const labSchema = mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  experiments: [{
    type: Schema.Types.ObjectId,
    ref: 'Experiment',
  }],
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student',
  }],
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

// Update the updated_at field on save
labSchema.pre('save', (next) => {
  this.updated_at = Date.now()
  next()
})

module.exports = Lab = mongoose.model('Lab', labSchema);