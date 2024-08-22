<script setup>
import AdminReserva from '@/components/AdminReserva.vue';
import { useUserStore } from '@/stores/user';

const user = useUserStore()
</script>

<template>
  <div>
<p class="text-white text-center text-lg mt-5">
  A continuación podras administrar tus proximas citas
</p>
<p v-if="user.loading" class="text-white text-2xl text-center mt-5">
  Cargando...
</p>
<div v-else>
<p v-if="user.noReservas" class="text-white text-2xl text-center mt-5">
  No tienes próximas citas
</p>
<div v-else class="grid grid-cols-1 gap-5 mt-10">
  <AdminReserva
    v-for="reserva in user.userReservas"
    :key="reserva._id"
    :reserva="reserva"
  />
</div>
</div>
  </div>
</template>