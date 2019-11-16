<template>
    <b-modal id="tempoModal"  title="Nueva temporada..." hide-footer>
    <div class="container" fluid>
    <form @submit="onSubmit">
       <b-form-group id="input-group-1" label="Fecha:" label-for="input-1">
        <b-form-input
          id="input-1"
          type="date"
          v-model="temporada.fechaIni"
          required
        ></b-form-input>
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
        imageData:null,
        uploadValue:0,
        temporada:{
            fechaIni:null,
            },
        };
    },
   methods: {
   onSubmit(){  
    axios.post("http://192.168.43.17:8080/temporada/Add",this.temporada).then(response=>{
      }).catch(e=>console.log(e));
    },
   }
}
</script>