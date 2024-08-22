import api from "@/lib/axios";

export default {
  
  create(data) {
      return api.post('/reservas',data)
  },
  getByDate(date) {
    return api.get(`/reservas?date=${date}`)
  },
  getUserReservas(userId) {
    return api.get(`/users/${userId}/reservas`)
  },
  getByid(id) {
    return api.get(`/reservas/${id}`)
  },
  update(id, data) {
    return api.put(`/reservas/${id}`, data)
  },
  delete(id) {
    return api.delete(`/reservas/${id}`)
  }
}