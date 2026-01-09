import Student from '../models/Student.js';

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 });
    return res.json(students);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createStudent = async (req, res) => {
  const { name, rollNumber, course, email, addedBy } = req.body || {};
  if (!name || !rollNumber || !course || !email || !addedBy) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const existing = await Student.findOne({ rollNumber });
    if (existing) {
      return res.status(409).json({ message: 'Student with this roll number already exists' });
    }
    const student = await Student.create({ name, rollNumber, course, email, addedBy });
    return res.status(201).json({ message: 'Student added successfully', student });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, rollNumber, course, email } = req.body || {};
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    if (student.isDeleted) {
      return res.status(404).json({ message: 'Student not found' });
    }
    if (rollNumber && rollNumber !== student.rollNumber) {
      const existing = await Student.findOne({ rollNumber });
      if (existing) {
        return res.status(409).json({ message: 'Roll number already in use' });
      }
    }
    student.name = name || student.name;
    student.rollNumber = rollNumber || student.rollNumber;
    student.course = course || student.course;
    student.email = email || student.email;
    await student.save();
    return res.json({ message: 'Student updated successfully', student });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    if (student.isDeleted) {
      return res.json({ message: 'Student deleted successfully' });
    }
    student.isDeleted = true;
    await student.save();
    return res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};
