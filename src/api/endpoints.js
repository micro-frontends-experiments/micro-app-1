import api from './index'

export const getNotes = (userId) => api.get(`/notes?userId=${userId}`)
  .then((res) => res.data)

export const putNote = (userId, payload) => api.put(`/note?userId=${userId}`, payload)
  .then((res) => res.data)

export const deleteNote = (userId, noteId) => api.delete(`/note?userId=${userId}&noteId=${noteId}`)
  .then((res) => res.data)

export const addNote = (userId) => api.post(`/note?userId=${userId}`)
  .then((res) => res.data)
