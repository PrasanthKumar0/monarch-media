import api from './axios';

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
  updateProfile: (data) => api.patch('/auth/profile', data),
};

export const contentApi = {
  universities: (params) => api.get('/universities', { params }),
  university: (id) => api.get(`/universities/${id}`),
  countries: (params) => api.get('/countries', { params }),
  country: (id) => api.get(`/countries/${id}`),
  courses: (params) => api.get('/courses', { params }),
  course: (id) => api.get(`/courses/${id}`),
  blogs: (params) => api.get('/blogs', { params }),
  blog: (id) => api.get(`/blogs/${id}`),
  reviews: () => api.get('/reviews'),
  settings: () => api.get('/settings'),
  contact: (data) => api.post('/contact', data),
};

export const studentApi = {
  profile: () => api.get('/students/me'),
  updateProfile: (data) => api.patch('/students/me', data),
  applications: () => api.get('/applications'),
  createApplication: (data) => api.post('/applications', data),
};

export const adminApi = {
  stats: () => api.get('/dashboard/stats'),
  students: (params) => api.get('/students', { params }),
  contacts: () => api.get('/contact'),
  updateContact: (id, data) => api.patch(`/contact/${id}`, data),
  createUniversity: (data) => api.post('/universities', data),
  deleteUniversity: (id) => api.delete(`/universities/${id}`),
  createCountry: (data) => api.post('/countries', data),
  createCourse: (data) => api.post('/courses', data),
  createBlog: (data) => api.post('/blogs', data),
};
