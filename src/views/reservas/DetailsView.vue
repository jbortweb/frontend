<script setup>
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { useReservasStore } from "@/stores/reservas";
import SelectedService from "../../components/SelectedService.vue";
import { precio } from "@/helpers";
import { ref } from "vue";

const reservas = useReservasStore();

const formatter = ref({
  date: "DD/MM/YYYY",
  month: "MMMM",
});

//Desabilitamos los dias anteriores del calendario, los meses posteriores + 1 y los dias de la semana que queramos, domingo es 0 y asi hasta 6 que es sabado

const disableDate = (date) => {
   const today = new Date()
   return date < today || date.getMonth() > today.getMonth() + 1 || [1,2].includes(date.getDay())
};

</script>

<template>
  <div class="space-y-4 mt-12">
    <h2 class="text-4xl text-center font-extrabold text-white">Detalles cita</h2>
    <p class="text-white text-lg text-center">Verifica la información y confirma tu cita</p>
    <h3 class="text-3xl font-extrabold text-white">Servicios</h3>
    <p v-if="reservas.sinServicios" class="text-white text-center text-xl">
      Sin Servicios Seleccionados
    </p>
    <div v-else class="grid gap-5">
      <SelectedService
        v-for="reserva in reservas.services"
        :key="reserva._id"
        :service="reserva"
      />

      <p class="text-white m-4 text-right text-2xl">
        Total a Pagar:
        <span class="font-black"> {{ precio(reservas.totalPagar) }}</span>
      </p>
    </div>

    <div class="space-y-8" v-if="!reservas.sinServicios">
      <h3 class="text-3xl font-extrabold text-white">Fecha y Hora</h3>
      <div class="lg:flex gap-5 items-start">
        <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
          <VueTailwindDatepicker
          :disable-date="disableDate"
            i18n="es"
            :formatter="formatter"
            as-single
            no-input
            v-model="reservas.date"
          />
        </div>

        <div v-if="reservas.dateSelected" class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0">
          <button
            v-for="(hour,index) in reservas.hours"
            :key="index"
            class="block p-3 text-blue-500 text-xl font-black  rounded-lg disabled:opacity-10"
            :class="reservas.time === hour ? 'bg-blue-500 text-white' : 'bg-white'"
            @click="reservas.time = hour"
            :disabled="reservas.disableTime(hour) ? true : false"
          >
            {{ hour }}
          </button>
        </div>
      </div>

      <div 
        v-if="reservas.confirmarReserva"
        class="flex justify-end"
      >
        <button
        class="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white rounded-lg uppercase p-3"
        @click="reservas.reservasGuardadas"
      >
        Confirmar Reserva
      </button>
      </div>

    </div>
  </div>
</template>