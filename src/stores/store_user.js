import { defineStore } from 'pinia'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),
  actions: {
    async fetchUser() {
      if (!this.token) return
      try {
        const res = await axios.get(`${baseURL}/users/me`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.user = res.data
      } catch (e) {
        console.error('Ошибка при получении пользователя', e)
        this.logout()
      }
    },
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
