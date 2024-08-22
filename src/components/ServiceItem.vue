<script setup>
import {useReservasStore} from '../stores/reservas.js'
import {precio} from '../helpers/index.js'

defineProps({
  service: {
    type: Object,
    required: true
  }
});

const reservas = useReservasStore()


</script>

<template>
  <div 
    class="p-5 space-y-5 rounded-lg cursor-pointer "
    :class="reservas.servicioSelecionado(service._id) ? 'bg-blue-500 text-white': 'bg-white'"
    @click="reservas.reservaSeleccionada(service)"  
  >
    <p class="text-2xl font-light">{{ service.name }}</p>
    <p 
      class="text-4xl font-black"      
      :class="reservas.servicioSelecionado(service._id) ? ' text-white': 'text-blue-600'"  
    >
      {{ precio(service.price) }}
    </p>
  </div>
</template>
