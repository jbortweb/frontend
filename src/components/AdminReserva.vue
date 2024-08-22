<script setup>
    import { displayDate } from '../helpers/date'
    import { precio } from '../helpers';
    
    defineProps({
        reserva: {
            type: Object
        }
    })
</script>

<template>
          <div 
              class="bg-white p-5 space-y-3 rounded-lg"
          >
                <p class="text-gray-500 font-black">
                    Fecha: <span class="font-light"> {{ displayDate( reserva.date ) }} </span>
                    Hora: <span class="font-light"> {{ reserva.time }} Horas.</span>
                </p>

                <p class="text-gray-500 font-black">
                    Nombre Cliente: <span class="font-light">{{ reserva.user.name }}</span>
                    Email: <span class="font-light">{{ reserva.user.email }}</span>
                </p>

                <p class="text-lg font-black">Servicios Solicitados en la cita</p>
                <div v-for="service in reserva.services"
                  :key="service._id"
                >
                    <p>{{ service.name }}</p>
                    <p class="text-2xl font-black text-blue-500">{{ precio( service.price ) }}</p>
                </div>

                <p class="text-2xl font-black text-right">
                    Total a pagar: <span class="text-blue-600"> {{ precio( reserva.total ) }} </span>
                </p>
            </div>
</template>