import servicesAPI from "@/api/servicesAPI";
import { defineStore } from "pinia";
import { onMounted, ref } from "vue";

export const useServicesStore = defineStore('services', () =>{

  const services = ref([])
  onMounted(async()=>{
    try {
      const {data} = await servicesAPI.all()
      services.value = data
    } catch (error) {
      console.log(error);
    }
  })

  return{
    services
  }
})