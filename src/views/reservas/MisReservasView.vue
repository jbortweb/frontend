<script setup>
import Reserva from '@/components/Reserva.vue';
import { useUserStore } from '@/stores/user';
const user = useUserStore()
</script>

<template>
  <div>
    <h2 class="text-4xl font-extrabold text-white mt-18">Mis citas</h2>
    <p class="text-white text-lg mt-5">Administra tus próximas citas</p>

    <p v-if="user.loading" class="text-white text-2xl text-center mt-5">Cargando...</p>
    <div v-else>

      <p v-if="user.noReservas" class="text-white text-2xl text-center mt-5">No tienes proximas citas</p>

      <div v-else class="grid grid-cols-1 gap-5 mt-10">
        <Reserva
          v-for="reserva in user.userReservas"
          :key="reserva._id"
          :reserva="reserva"
        />
      </div>
    </div>
  </div>
</template>