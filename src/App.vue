<script setup>
  import {ref, reactive, watch, onMounted} from 'vue'
  import {uid} from 'uid'
  
  import Header from './components/Header.vue'
  import Formulario from './components/Formulario.vue'
  import Paciente from './components/Paciente.vue'
 import Footer from './components/Footer.vue'

  const pacientes = ref([])
  const formulario = ref('Crear paciente')
  const paciente = reactive({
        id: null,
        nombre: '',
        propetario: '',
        email: '',
        alta: '',
        sintomas: ''
    })

    watch(pacientes,()=>{
      guardarLocalStorage();
    },{
      deep: true
    } )

    onMounted(()=>{
      const pacientesStorage = localStorage.getItem('pacientes');
      if(pacientesStorage){
        pacientes.value = JSON.parse(pacientesStorage)
      }
    })
    const guardarLocalStorage = () =>{
      localStorage.setItem('pacientes',JSON.stringify(pacientes.value))
    }
    const guardarPaciente= ()=>{
      // Asi sacamos una copia y le quitamos lo reactivo al paciente, asi mostrara los datos de la copia en el listar
      //y el original se vacia sin afectar la copia
      if(paciente.id){
        const {id} = paciente
        const i = pacientes.value.findIndex((pacienteStore)=> pacienteStore.id === id)
        pacientes.value[i] = {...paciente}
        formulario.value ='Crear paciente'
      }else{
        pacientes.value.push({
        ...paciente,
        id: uid()
        })
      }
   
      //vaciamos el formulario reiniciando los valores a 0
      // paciente.nombre = ''
      // paciente.propetario = ''
      // paciente.email = ''
      // paciente.alta = ''
      // paciente.sintomas = ''

      //otra forma
      Object.assign(paciente, {
            nombre: '',
            propetario: '',
            email: '',
            alta: '',
            sintomas: ''
          })
    }

    const actualizarPaciente = (id)=>{
      // Filter retornara un array y dentro de el objeto encontrado, con el [0] sacas directamente el objeto en esa posicion
        const pacienteEditar = pacientes.value.filter(paciente => paciente.id === id)[0]
        formulario.value ='Editar paciente'
        Object.assign(paciente, pacienteEditar)
      
    }

    const eliminarPaciente = (id)=>{
      pacientes.value = pacientes.value.filter((pacienteEncontrado)=>pacienteEncontrado.id !== id)
    }

</script>

<template>
  <Header/>
  
  <div class="container mx-auto mt-20">

    <div class=" mt-12 md:flex bg-gray-200 ">
      <Formulario
        v-model:nombre="paciente.nombre"
        v-model:propetario="paciente.propetario"
        v-model:email="paciente.email"
        v-model:alta="paciente.alta"
        v-model:sintomas="paciente.sintomas"
        @guardar-paciente="guardarPaciente"
        :id="paciente.id"
        :formulario="formulario"
      />

      <div class="md:w-1/2 md:h-screen overflow-y-scroll">
        <h3 class="font-black text-3xl text-center">Administra tus pacientes</h3>

        <div v-if="pacientes.length >0">
            <p class="text-lg mt-5 text-center mb-10">
              Informacion de Pacientes 
              <span class="text-emerald-800  font-bold">Administralos</span>
            </p>
          <Paciente
          v-for="paciente in pacientes"
          :paciente="paciente"
          @actualizar-paciente="actualizarPaciente"
          @eliminar-paciente="eliminarPaciente"
          />
        </div>

        <p v-else class="mt-10 text-2xl text-center ">No hay pacientes</p>

      </div>
    </div>

  </div>
  <Footer/>
</template>

