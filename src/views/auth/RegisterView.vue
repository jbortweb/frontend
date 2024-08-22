<script setup>
import { inject } from "vue";
import { reset } from "@formkit/vue";
import authAPI from "@/api/authAPI";

const toast = inject("toast");

const handleSumbit = async ({ password_confirm, ...formData }) => {
  try {
    const { data } = await authAPI.register(formData);
    toast.open({
      message: data.msg,
      type: "success",
    })
    reset('registerForm')
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: "error",
    })
  }
};
</script>

<template>
  <div>
    <h1 class="text-6xl font-extrabold text-white text-center mt-6">
      Crea una cuenta
    </h1>
    <p class="text-2xl text-white text-center my-5">
      Crea una cuenta en Peluqueria
    </p>

    <FormKit
      id="registerForm"
      type="form"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa las notificaciones"
      @submit="handleSumbit"
    >
      <FormKit
        type="text"
        label="Nombre"
        name="name"
        placeholder="Tu nombre"
        validation="required|length:3"
        :validation-messages="{
          required: 'El nombre es obligatorio',
          length: 'El nombre es muy corto',
        }"
      />
      <FormKit
        type="email"
        label="Email"
        name="email"
        placeholder="Email de registro"
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
      <FormKit
        type="password"
        name="password_confirm"
        label="Repetir password"
        placeholder="Repite el password"
        validation="required|confirm"
        :validation-messages="{
          required: 'Confirmar el Passwor es obligatorio',
          confirm: 'Las contraseñas no son iguales',
        }"
      />

      <FormKit type="submit">Crear cuenta</FormKit>
    </FormKit>
  </div>
</template>