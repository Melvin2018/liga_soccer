<template>
   <b-modal id="modal2"  title="Agregando Equipo..." hide-footer>
    <div class="container" fluid>
    <form @submit.prevent="onSubmit">
    <b-form-group id="input-group-1" label="Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="equipo.nombre"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
       <b-form-group label="Foto:" label-for="file" label-cols-sm="2">
     <br/>
         <b-form-file
          id="file" 
          v-model="imageData"
          accept="images/*"
          required
          :state="Boolean(imageData)"
          placeholder="Choose a file or drop it here..."
         drop-placeholder="Drop file here..."
      ></b-form-file>
    </b-form-group>
     <b-form-group id="input-group-7" label="lugar:" label-for="input-7">
        <b-form-select
          id="input-7"
          v-model="equipo.lugar"
          required
        >
        <option v-for="l in lugares" :key="l.id" :value="l">
          {{ l.nombre }}
        </option>
        </b-form-select>
      </b-form-group>
      <b-button type="submit" variant="primary" >Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      </form>
    </div>
    </b-modal>
</template>
<script>
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/storage'
export default {
 data() {
      return {  
        imageData:null,
        equipo:{
            nombre:'',
            logo:'',
            lugar:{
              id:0,
              nombre:'',
              direccion:''
              },
            },
        lugares:[]
        };
    },
   methods: {
 async onSubmit(){
    if(navigator.onLine){
      var sec=new Date().getSeconds();
        const response = await firebase.storage()
              .ref(`equipos/${sec}${this.imageData.name}`)
              .put(this.imageData);
        const url = await response.ref.getDownloadURL();
         this.equipo.logo = await url.toString();
      }
     await axios.post("http://192.168.43.17:8080/equipo/Add",this.equipo)
       .catch(e=>console.log(e));
        this.$router.go();
    },
      getLugar(){
			axios.get("http://192.168.43.17:8080/lugar/All").then(response=>{
        this.lugares=response.data;
        this.equipo.lugar=this.lugares[0];
			}).catch(e=>console.log(e));
	  	}
    },
	mounted(){
		this.getLugar();
	} 
}
</script>