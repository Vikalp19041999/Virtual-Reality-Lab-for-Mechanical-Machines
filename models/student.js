const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  roll_number: { type: String, required: true },
  year: { type: String, required: true },
  branch: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

// Update the updated_at field on save
studentSchema.pre('save', (next) => {
  this.updated_at = Date.now()
  next()
})

module.exports = Student = mongoose.model('Student', studentSchema);