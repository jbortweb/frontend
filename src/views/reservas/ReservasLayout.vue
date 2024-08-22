<script setup>
import { RouterLink } from "vue-router";
import {useUserStore} from "@/stores/user.js"

const user = useUserStore()
</script>

<template>
  <div>
    <div class="flex justify-between">
      <h1 class="text-2xl lg:text-4xl font-black text-white">
        Peluquería Prueba
      </h1>

      <div class="flex flex-col space-y-5">
        <div class="flex gap-2 items-center ml-2">
          <p class="text-white text-right">Hola: {{user.getUserName}}</p>
          <button
            type="button"
            class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg"
            @click="user.logout"
          >
            Cerrar sesión
          </button>
        </div>

        <nav class="flex gap-2 items-center justify-end">
          <RouterLink
            :to="{ name: 'mis-reservas' }"
            class="text-gray-200 p-3 uppercase text-xs font-black rounded-lg"
          >
            Mis Citas
          </RouterLink>
          <RouterLink
            :to="{ name: 'nueva-reserva' }"
            class="text-gray-200 p-3 uppercase text-xs font-black rounded-lg bg-blue-700"
          >
            Nueva reserva
          </RouterLink>
        </nav>
      </div>
    </div>
    <main>
      <RouterView />
    </main>
  </div>
</template>