const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

// Update the updated_at field on save
adminSchema.pre('save', (next) => {
  this.updated_at = Date.now()
  next()
})

module.exports = Admin = mongoose.model('Admin', adminSchema);