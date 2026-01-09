import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rollNumber: { type: String, required: true, unique: true, trim: true },
  course: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  addedBy: { type: String, required: true },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
