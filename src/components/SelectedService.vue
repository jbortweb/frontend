<script setup>
import { precio } from '@/helpers';
import { useReservasStore } from '@/stores/reservas';

const props = defineProps({
  service: {    
    type: Object,
    required: true
  }
})

const reservas = useReservasStore()

</script>
<template>
    <div class="border border-gray-600 rounded-lg p-2 flex justify-between items-center">
    <div 
    class="p-5 rounded-lg cursor-pointer"
    
  >
    <p class="text-2xl font-extrabold text-white">{{ service.name }}</p>
    <p 
      class="text-3xl font-black text-blue-500"
    >
      {{ precio(service.price) }}
    </p>
  </div>
  <button
    type="button"
    class="inline-flex items-center bg-red-600 hover:bg-red-700 rounded-md text-white text-sm px-3 py-2 mr-3 font-semibold shadow-sm ring-1 ring-inset ring-red-300"
    @click="reservas.reservaSeleccionada(service)"
  >
    Eliminar
  </button>
  </div>
</template>
