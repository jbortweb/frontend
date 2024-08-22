<script setup>
import { onMounted } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import reservaAPI from '@/api/reservaAPI';
import { useReservasStore } from '@/stores/reservas';

const reservas = useReservasStore()
const route = useRoute()
const router = useRouter()

const {id} = route.params

onMounted(async () => {

  try {
    const {data} = await reservaAPI.getByid(id)
    reservas.setSelectedReservas(data)
    
  } catch (error) {
    router.push({name:'mis-reservas'})
    
  }
})


</script>

<template>
  <div>
    <nav class="my-5 flex gap-3">
      <RouterLink
        :to="{name:'edit-reserva'}"
        class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
        :class="route.name === 'edit-reserva'? 'bg-blue-500 text-white' : ' bg-white text-blue-500'"
      >
        Servicios
      </RouterLink>
      <RouterLink
        :to="{name:'edit-detalles-reserva'}"
        class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
        :class="route.name === 'edit-detalles-reserva'? 'bg-blue-500 text-white' : ' bg-white text-blue-500'"
      >
        Citas y Resumen
      </RouterLink>
    </nav>
    <RouterView/>
  </div>
</template>