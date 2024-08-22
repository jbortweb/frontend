<script setup>
import authAPI from '@/api/authAPI';
import { reset } from '@formkit/vue';
import { inject } from 'vue';

const toast = inject('toast')

const handleSumbit = async({email}) => {
  try {
    const {data} = await authAPI.forgotPassword({email})
    toast.open({
      message: data.msg,
      type:'success'
    })
    reset('formatPassword')   
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type:'error'
    })
    
  }
  
}
</script>

<template>
  <div>
    <h1 class="text-5xl font-extrabold text-white text-center mt-6">
      Olvide mi password
    </h1>
    <p class="text-2xl text-white text-center my-5">
      Recupera el acceso a tu cuenta
    </p>

    <FormKit
      id="formatPassword"
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
      <FormKit type="submit">Enviar instrucciones</FormKit>
    </FormKit>
  </div>
</template>