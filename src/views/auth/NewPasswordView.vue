<script setup>
import authAPI from '@/api/authAPI';
import { reset } from '@formkit/vue';
import { inject, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const toast = inject('toast')

const route = useRoute()
const router = useRouter()
const {token} = route.params

const validToken = ref(false)

onMounted(async()=>{
  try {
    const {data} = await authAPI.verifyPasswordResetToken(token)
    validToken.value = true
    
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type:'error'
    })
  }
})

const handleSumbit = async({password}) => {
  try {
    const {data} = await authAPI.updatePassword(token,{password})
    toast.open({
      message: data.msg,
      type:'success'
    })

    setTimeout(()=>{
      router.push({name:'login'})
    },3000)

  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type:'error'
    })
    
  }
  
}
</script>

<template>
  <div v-if="validToken">
    <h1 class="text-5xl font-extrabold text-white text-center mt-6">
      Nueva contraseña
    </h1>
    <p class="text-2xl text-white text-center my-5">
      Escribe tu nueva contraseña
    </p>

    <FormKit
      id="formatPassword"
      type="form"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa las notificaciones"
      @submit="handleSumbit"
    >
    <FormKit
        type="password"
        label="Password"
        name="password"
        placeholder="Min 8 caracteres, un número y un simbolo"
        validation="required|contains_numeric|contains_symbol|length:8"
        :validation-messages="{
          required: 'El password es obligatorio',
          length:
            'El password debe contener 8 caracteres, un numero y un simbolo',
          contains_numeric: 'El password debe llevar al menos un número',
          contains_symbol:
            'El password debe llevar alguno de estos simbolos (<>@$!%*?&)',
        }"
      />
      <FormKit type="submit">Guardar contraseña</FormKit>
    </FormKit>
  </div>
  <p v-else class="text-center text-2xl font-black text-white"> El token no es válido</p>
</template>