<script setup>
import ServiceItem from '../../components/ServiceItem.vue'
import { useServicesStore } from '@/stores/services';
const services = useServicesStore()
</script>

<template>
  <div class="mt-12">
    <h2 class="text-4xl font-extrabold text-white text-center ">Servicios</h2>
    <p class="text-white text-lg mb-8 mt-3 text-center">Elige al menos un servicio para pedir cita</p>
    <div class="grid grid-cols-2 gap-5 mt-5">
      <ServiceItem
        v-for="service in services.services"
        :key="service._id"
        :service="service"
      >
      </ServiceItem>
    </div>

  </div>
</template>