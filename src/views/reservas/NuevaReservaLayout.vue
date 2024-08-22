<script setup>
import { useReservasStore } from '@/stores/reservas';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const reservas = useReservasStore()

onMounted(()=> {
  reservas.clearReserva()
})

</script>

<template>
  <div>
    <nav class="my-5 flex gap-3">
      <RouterLink
        :to="{name:'nueva-reserva'}"
        class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
        :class="route.name === 'nueva-reserva'? 'bg-blue-500 text-white' : ' bg-white text-blue-500'"
      >
        Servicios
      </RouterLink>
      <RouterLink
        :to="{name:'detalles-reserva'}"
        class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
        :class="route.name === 'detalles-reserva'? 'bg-blue-500 text-white' : ' bg-white text-blue-500'"
      >
        Citas y Resumen
      </RouterLink>
    </nav>
    <RouterView/>
  </div>
</template>
