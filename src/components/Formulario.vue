<script setup>
    import { ref, reactive, computed } from 'vue';
    import Alerta from './Alerta.vue'

    const alerta = reactive({
        tipo: '',
        mensaje: ''
    })
    
   const emit = defineEmits(['update:nombre','update:propetario','update:email','update:alta','update:sintomas','guardar-paciente'])
    const props = defineProps({
        id:{
            type: [String,null],
            required: true
        },
        nombre:{
            type: String,
            required: true
        },
        propetario:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        alta:{
            type: String,
            required: true
        },
        sintomas:{
            type: String,
            required: true
        },
        formulario:{
            type: String,
            required: true
        }
    })

    const validar = ()=>{
        // se agrega el preventDefault porque por defecto el formulario tiene un action que por defecto te llevara a 
        //otro url
       //Object.values te da la respuesta en forma de arreglo
        if(Object.values(props).includes('')){
            alerta.mensaje = 'Todos los campos son obligatorios'
            alerta.tipo = 'error'
            return
        }
        emit('guardar-paciente')
        alerta.tipo = 'success'
        alerta.mensaje = 'Guardado correctamente'
        setTimeout(()=>{
            // limpiamos la informacion de la alerta
            Object.assign(alerta, {
                tipo: '',
                mensaje: ''
            })
        },2000)
    }

    const editando = computed(()=>{
        return props.id
    })
</script>

<template>
    <!-- Divide la pantalla en 2 columnas -->
    <div class="md:w-1/2 px-5">
        <h2 class="font-black text-3xl text-center">Seguimiento Pacientes</h2>
        <p class="text-lg mt-5 text-center mb-10">
            Añade Pacientes y 
            <span class="text-emerald-800 font-bold">Administralos</span>
        </p>
        <Alerta 
            v-if="alerta.mensaje"
            :alerta="alerta"
        />
        <div class="w-full font-black text-center text-white py-3 text-xl bg-emerald-900 "> 
                <h2>{{ formulario }}</h2>
            </div>
        <form 
            class="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            @submit.prevent="validar"
            >
         
            <div class="mb-5">
                <label 
                    for="mascota"
                    class="block text-gray-700 uppercase font-bold"
                >
                Nombre Mascota
                </label>
                    <!--Esto es igual al v-model="nombre" 
                        :value="nombre"
                    @input="(e)=>nombre = e.target.value" -->
                <input 
                    :value="nombre"
                    @input="$emit('update:nombre',$event.target.value)"
                    id="mascota"
                    type="text"
                    placeholder="Nombre de la mascota"
                    class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md">
            </div>

            <div class="mb-5">
                <label 
                    for="propetario"
                    class="block text-gray-700 uppercase font-bold"
                >
                Nombre Propietario
                </label>

                <input 
                    :value="propetario"
                    @input="$emit('update:propetario',$event.target.value)"
                    id="propetario"
                    type="text"
                    placeholder="Nombre del propetario"
                    class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md">
            </div>

            <div class="mb-5">
                <label 
                    for="email"
                    class="block text-gray-700 uppercase font-bold"
                >
                Email
                </label>

                <input 
                    :value="email"
                    @input="$emit('update:email',$event.target.value)"
                    id="email"
                    type="text"
                    placeholder="Escribe tu email"
                    class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md">
            </div>

            <div class="mb-5">
                <label 
                    for="alta"
                    class="block text-gray-700 uppercase font-bold"
                >
                Alta
                </label>

                <input 
                    :value="alta"
                    @input="$emit('update:alta',$event.target.value)"
                    id="alta"
                    type="date"
                    class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md">
            </div>
            
            <div class="mb-5">
                <label 
                    for="sintomas"
                    class="block text-gray-700 uppercase font-bold"
                >
                Síntomas
                </label>

                <textarea 
                    :value="sintomas"
                    @input="$emit('update:sintomas',$event.target.value)"
                    id="sintomas"
                    placeholder="Describe los sintomas"
                    class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md h-40">
                </textarea>
            </div>
            <input 
            type="submit"
            class="bg-emerald-600 w-full p-3 text-white uppercase font-bold hover:bg-emerald-800 cursor-pointer transition-colors"
            :value="[editando ? 'Guardar Cambios' : 'Registrar Paciente']"
            >
        </form>
    </div>
</template>


