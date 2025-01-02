import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema({
  siteUrl: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export const Password = mongoose.model('Password', passwordSchema);