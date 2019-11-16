<template>
   <b-modal id="modal"  title="Agregando equipo a la temporada" hide-footer>
    <div class="container">
    <form @submit="onSubmit">
    <b-form-group id="input-group-1" label="Equipo:" label-for="input-1">
        <b-form-select id="input-1" v-model="entity.equipo" @change="getPersonas" required>
        <option v-for="e in equipos" :key="e.id" :value="e.id">
          {{ e.nombre }}
        </option>
        </b-form-select>
      </b-form-group>
     <b-form-group id="input-group-2" label="Representante:" label-for="input-2">
        <b-form-select id="input-2" v-model="entity.jugador" required>
        <option v-for="e in jugadores" :key="e.id" :value="e.id">
          {{ e.persona.nombres }}
        </option>
     </b-form-select>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      </form>
    </div>
    </b-modal>
</template>
<script>
import axios from 'axios'
export default {
 data() {
      return {  
        uploadValue:0,
        entity:{
        jugador:0,
        equipo:0,
        },
        equipos:[],
        jugadores:[]
        };
    },
   methods: {
   onSubmit(){
        const URL = "http://192.168.43.17:8080/equipoT/Add";
         axios.post(URL,this.entity).then(response=>{
          }).catch(e=>console.log(e));
    },
      getEquipos(){
			axios.get("http://192.168.43.17:8080/equipoT/restantes").then(response=>{
				this.equipos=response.data;
			}).catch(e=>console.log(e));
        },
      getPersonas(){
			axios.get(`http://192.168.43.17:8080/Jugador/restantes/${this.entity.equipo}`).then(response=>{
				this.jugadores=response.data;
			}).catch(e=>console.log(e));
		}
    },
	mounted(){
        this.getEquipos();
	} 
}
</script>