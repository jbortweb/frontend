<script setup>
import { onMounted } from 'vue';
import {useRoute, useRouter} from 'vue-router'
import { inject } from "vue";
import authAPI from '@/api/authAPI.js'

const route = useRoute()
const router = useRouter()
const {token} = route.params
const toast = inject("toast");

onMounted(async()=>{
  try {

    const {data} = await authAPI.verifyAccount(token)
    toast.open({
      message: data.msg,
      type:'success'
    })
    setTimeout(()=>{
      router.push({name:'login'})
    },5000)
    
  } catch (error) {
    toast.open({
      message:error.response.data.msg,
      type:'error'
    })
  }
})

</script>

<template>
</template>