import User from '../models/User.js';
import Stats from '../models/Stats.js';

const getStats = async () => {
  let stats = await Stats.findOne({ key: 'global' });
  if (!stats) {
    stats = await Stats.create({ key: 'global' });
  }
  return stats;
};

export const login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    user.loginCount += 1;
    await user.save();
    const stats = await getStats();
    stats.logins += 1;
    await stats.save();
    return res.json({ 
      message: 'Login successful', 
      name: user.name, 
      email: user.email,
      loginCount: user.loginCount 
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password required' });
  }
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const user = await User.create({ name, email, password });
    const stats = await getStats();
    stats.signups += 1;
    await stats.save();
    return res.status(201).json({ message: 'Account created successfully', name: user.name, email: user.email });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getStatsCount = async (req, res) => {
  try {
    const stats = await getStats();
    return res.json({ signups: stats.signups, logins: stats.logins });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};
