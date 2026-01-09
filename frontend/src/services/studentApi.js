import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getAllStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch students');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('An error occurred. Please try again.');
    }
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_URL}/students`, studentData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to add student');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('An error occurred. Please try again.');
    }
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${API_URL}/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to update student');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('An error occurred. Please try again.');
    }
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/students/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to delete student');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('An error occurred. Please try again.');
    }
  }
};
