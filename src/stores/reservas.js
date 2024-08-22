import { defineStore } from "pinia";
import { computed, inject, onMounted, ref, watch } from "vue";
import reservaAPI from "@/api/reservaAPI";
import { convertDate, convertToISO } from "@/helpers/date.js";
import { useRouter } from "vue-router";
import { useUserStore } from "./user";

export const useReservasStore = defineStore('reservas', () => {

  const reservaId = ref('')
  const services = ref([])
  const date = ref('')
  const hours = ref([])
  const time = ref('')
  const reservasByDate = ref([])

  const toast = inject('toast')
  const router = useRouter()
  const user = useUserStore()

  const confirmarReserva = computed(() => {
    return services.value && date.value && time.value
  })

  //Creamos las horas para las citas

  onMounted(() => {
    const startDate = 10
    const endDate = 19

    for (let i = startDate; i <= endDate; i++) {
      hours.value.push(i + ":00")
    }
  })

  //Obtener las citas seleccionadas por dias y horas

  watch(date, async () => {
    time.value = "";
    if (date.value === '') return;
  
    try {
      const { data } = await reservaAPI.getByDate(date.value);
      
      if (reservaId.value) {
        reservasByDate.value = data.filter(reserva => reserva._id !== reservaId.value);
        const selectedReserva = data.find(reserva => reserva._id === reservaId.value);
        time.value = selectedReserva ? selectedReserva.time : "";
      } else {
        reservasByDate.value = data;
      }
    } catch (error) {
      console.error("Error al obtener reservas por fecha:", error);
    }
  });
  

  //Datos de la reserva seleccionados para su edicion

  function setSelectedReservas(reserva) {
    
    services.value = reserva.services
    date.value = convertDate(reserva.date)
    time.value = reserva.time
    reservaId.value = reserva._id
  }

  //Filtrar y añadir reservas

  const reservaSeleccionada = (service) => {
    if (services.value.some(servicioSelecionado => servicioSelecionado._id === service._id)) {
      services.value = services.value.filter(servicioSelecionado => servicioSelecionado._id !== service._id)
    } else {
      if (services.value.length === 2) {
        alert('Máximo dos servicios por cita')
        return
      }
      services.value.push(service)
    }
  }

  const servicioSelecionado = computed(() => {
    return (id) => services.value.some(service => service._id === id)
  })

  //Guardar reservas

  const reservasGuardadas = async () => {
    const reservas = {
      services: services.value.map(service => service._id),
      date: convertToISO(date.value),
      time: time.value,
      total: totalPagar.value
    }
    if (reservaId.value) {
      try {
        const { data } = await reservaAPI.update(reservaId.value, reservas)
        toast.open({
          message: data.msg,
          type: 'success'
        })
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await reservaAPI.create(reservas)
        toast.open({
          message: data.msg,
          type: 'success'
        })
      } catch (error) {
        console.log(error);
      }
    }

    clearReserva()
    user.getUserReservas()

    router.push({ name: 'mis-reservas' })
  };

  //Limpiar reservas una vez han sido guardadas

  const clearReserva = () => {
    services.value = []
    date.value = ''
    time.value = ''
    reservaId.value =''
  }

  //Eliminar reserva

  async function eliminarReserva(id){
    if(confirm('Quieres cancelar esta cita?')){
      try {
        const {data} = await reservaAPI.delete(id)
        toast.open({
          message: data.msg,
          type:'success'
        })
        user.userReservas = user.userReservas.filter(reserva => reserva._id !== id)
      } catch (error) {
        toast.open({
          message: error.response.data.msg,
          type:'error'
        })
      }
    }
    
  }

  //Comprobar si hay servicios

  const sinServicios = computed(() => services.value.length === 0)

  //Calcular total a pagar

  const totalPagar = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0)
  })

  //Comprobar si ha seleccionado la fecha

  const dateSelected = computed(() => {
    return date.value ? true : false
  })

  //Deshabilitar las horas seleccionadas

  const disableTime = computed(() => {
    return (hour) => {
      return reservasByDate.value.find(reserva => reserva.time === hour)
    }
  })

  return {
    services,
    date,
    hours,
    time,
    confirmarReserva,
    reservaSeleccionada,
    reservasGuardadas,
    setSelectedReservas,
    clearReserva,
    eliminarReserva,
    servicioSelecionado,
    sinServicios,
    totalPagar,
    dateSelected,
    disableTime
  }
})