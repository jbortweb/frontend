import authAPI from "@/api/authAPI";
import reservaAPI from "@/api/reservaAPI";
import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export const useUserStore = defineStore('user', () => {

  const route = useRouter()
  const user = ref({})
  const userReservas = ref([])
  const loading = ref(true)

  onMounted(async () => {
    try {
      const { data } = await authAPI.auth()
      user.value = data
      await getUserReservas()
    } catch (error) {
      console.log(error);
    } finally {
      loading.value =false    
    }
  })

  async function getUserReservas() {
    const { data } = await reservaAPI.getUserReservas(user.value._id)
    userReservas.value = data

  }

  function logout() {
    localStorage.removeItem('AUTH_TOKEN')
    user.value = {}
    route.push({ name: 'login' })
  }

  const getUserName = computed(() => {
    return user.value?.name 
  })

  const noReservas = computed(() => userReservas.value.length === 0)

  return {
    user,
    userReservas,
    getUserName,
    noReservas,
    loading,
    logout,
    getUserReservas,
  }
})
