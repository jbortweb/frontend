<script setup>
import authAPI from '@/api/authAPI'
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const toast = inject('toast')

const router = useRouter()

const handleSumbit = async(formData) =>{
  try {
    const { data: {token} } = await authAPI.login(formData);
    
    localStorage.setItem('AUTH_TOKEN', token)
    router.push({name:'mis-reservas'})
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    })
  };
}

</script>

<template>
  <div>
    <h1 class="text-6xl font-extrabold text-white text-center mt-6">
      Inicia Sesión
    </h1>
    <p class="text-2xl text-white text-center my-5">
      Inicia Sesión en Peluqueria
    </p>

    <FormKit
      id="registerForm"
      type="form"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa las notificaciones"
      @submit="handleSumbit"
    >
      <FormKit
        type="email"
        label="Email"
        name="email"
        placeholder="Email de Usuario"
        validation="required|email"
        :validation-messages="{
          required: 'El Email es obligatorio',
          length: 'Email no es válido',
        }"
      />
      <FormKit
        type="password"
        label="Password"
        name="password"
        placeholder="Tu Password"
        validation="required"
        :validation-messages="{
          required: 'El password es obligatorio',
        }"
      />
      <FormKit type="submit">Iniciar Sesión</FormKit>
    </FormKit>
  </div>
</template>