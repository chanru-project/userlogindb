import CertificateDownload from '../models/CertificateDownload.js';

export const recordDownload = async (req, res) => {
  const { name, courseTitle, signature } = req.body || {};
  if (!name || !courseTitle) {
    return res.status(400).json({ message: 'Name and courseTitle are required' });
  }
  try {
    const entry = await CertificateDownload.create({ name, courseTitle, signature });
    return res.status(201).json({ message: 'Recorded', id: entry._id });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};
