<script setup>
import { precio } from '@/helpers/index.js';
import {displayDate} from '../helpers/date.js'
import { RouterLink } from 'vue-router';
import { useReservasStore } from '@/stores/reservas.js';

  const reservas = useReservasStore()

  defineProps({
    reserva :{
      type: Object
    }
  })
</script>

<template>
  <div class="bg-white p-5 space-y-3 rounded-lg">
    <p class="text-gray-500 font-black">
      Fecha: <span class="font-light pr-10">{{ displayDate(reserva.date) }}</span>
      Hora: <span class="font-light">{{ reserva.time }} Horas.</span>
    </p>
    <p class="text-2xl font-black">Servicios solicitados de la cita</p>
    <div 
      v-for="service in reserva.services"
      :key="service.id"
    >
      <p>{{ service.name }}</p>
      <p class="text-2xl font-black text-blue-500">{{ precio(service.price) }}</p>
    </div>
    <p class="text-2xl font-black text-right">
      Total a pagar: <span class="text-blue-600">{{ precio(reserva.total) }}</span>
    </p>
    <div class="flex gap-2 items-center">
      <RouterLink 
        :to="{name:'edit-reserva', params: { id: reserva._id } }"
        class="bg-slate-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none">
        Editar cita
      </RouterLink>
      <button
        @click="reservas.eliminarReserva(reserva._id)"
        class="bg-red-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
      >
        Cancelar cita
      </button>

    </div>
  </div>
</template>