import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
  key: { type: String, default: 'global', unique: true },
  signups: { type: Number, default: 0 },
  logins: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Stats', statsSchema);
