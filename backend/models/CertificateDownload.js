import mongoose from 'mongoose';

const certificateDownloadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  courseTitle: { type: String, required: true, trim: true },
  signature: { type: String, required: false, trim: true },
  downloadedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('CertificateDownload', certificateDownloadSchema);
