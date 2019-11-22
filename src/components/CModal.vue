<template>
      <b-modal id="modal1" ref="modal1" title="Agregando Jugador..." hide-footer>
    <div class="container" fluid>
    <form @submit.prevent="onSubmit">
     <b-form-group id="input-group-1" label="Dorsal:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="entity.dorsal"
          required
          placeholder="Numero de uniforme"
        ></b-form-input>
      </b-form-group>
       <b-form-group id="input-group-2" label="Jugador:" label-for="input-2">
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
import Swal from 'sweetalert2'
export default {
  props:{
   idequipo:{
     type:Number,
    required:true,
    default:0
  },
  },
  watch:{
    idequipo:function(newvalue){
       this.entity.equipo=newvalue;
      this.getJugadores();
    }
  },
 data() {
      return { 
        jugadores:[], 
        entity:{
        dorsal:0,
        equipo:this.idequipo,
        jugador:0,
        },
      };
    },
  methods: {
  async onSubmit(){
      var val='';
      const URL = this.$path+"/carnet/Add";
      await this.$axios.post(URL,this.entity).then(response=>{
        val=response.data;
      }).catch(e=>console.log(e)); 
           if(val==''){
        await Swal.fire({
              timer: 1500,
              position: 'top-end',
							type: 'error',
              title: 'Dorsal',
              text:'dorsal duplicado',
              showConfirmButton: false,
              animation:true
							});
           }else{
        await Swal.fire({
							position: 'top-end',
							type: 'success',
							title: 'Se ha agregado',
							showConfirmButton: false,
							timer: 1500
              });
              this.$router.go();
          } 
    },
    async getJugadores(){
		await	this.$axios.get(this.$path+`/Jugador/jugadores/${this.entity.equipo}`).then(response=>{
				this.jugadores=response.data;
      }).catch(e=>console.log(e));
    },
  },
	mounted(){
   this.getJugadores();
  }
} 
</script>