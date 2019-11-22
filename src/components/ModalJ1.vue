<template>
      <b-modal id="modalEdit"  title="Editando Jugador..." hide-footer>
    <div class="container" fluid>
    <form @submit.prevent="onSubmit">
     <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="jugador.persona.nombres"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
    <b-form-group id="input-group-2" label="Your last name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="jugador.persona.apellidos"
          required
          placeholder="Enter last name"
        ></b-form-input>
      </b-form-group>
  <b-form-group id="input-group-3" label="Your DUI:" label-for="input-3">
        <input-mask
          id="input-3"
          v-model="jugador.persona.dui"
          required
          mask="99999999-9"
          maskChar=" "
          placeholder="Enter DUI"
        ></input-mask>
      </b-form-group>
      <b-form-group id="input-group-4" label="Your NIT:" label-for="input-4">
        <input-mask
          id="input-4"
          v-model="jugador.persona.nit"
          required
          mask="9999-999999-999-9"
          maskChar=" "
          placeholder="Enter NIT"
        ></input-mask>
      </b-form-group>
       <b-form-group id="input-group-5" label="Your altura:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="jugador.persona.altura"
          required
          placeholder="Enter Altura"
        ></b-form-input>
      </b-form-group>
       <b-form-group id="input-group-6" label="Your edad:" label-for="input-6">
        <b-form-input
        type="number"
        id="input-6"
          v-model="jugador.persona.edad"
          required
          placeholder="Enter Edad"
        >
        </b-form-input>
       </b-form-group>
    <b-form-group label="Foto:" label-for="file" label-cols-sm="2">
         <b-form-file
        id="file"
        v-model="imageData"
        accept="images/*"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
    </b-form-group>
      <b-form-group id="input-group-7" label="lugar:" label-for="input-7">
        <b-form-select
          id="input-7"
          v-model="jugador.persona.lugar">
        <option v-for="l in lugares" :key="l.id" :value="l">
          {{ l.nombre }}
        </option>
        </b-form-select>
      </b-form-group>
      <b-form-group id="input-group-8" label="Posicion:" label-for="input-8">
        <b-form-select id="input-8" v-model="jugador.posicion" required>
        <option v-for="p in posiciones" :key="p.id" :value="p.nombre">
          {{ p.nombre }}
        </option>
        </b-form-select>
      </b-form-group>
      <b-button type="submit"  variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </form>
    </div>
    </b-modal>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/storage'
  export default {
  props:{
   id:{
     type:Number,
    required:true,
    default:0
  },
  },
  watch:{
    id:function(newvalue){
       this.jugador.id=newvalue;
      this.llenar();
    }
  },
    data() {
      return {  
        imageData:null,
        jugador: {
          id:this.id,
          foto:'',
          posicion:'',
          persona:{
          nombres:'',
            apellidos:'',
            edad:0,
            altura:null,
            dui:'',
            nit:'',
            lugar:{
              id:0,
              nombre:'',
              direccion:''
           },
         },
        },
        lugares:[],
        posiciones:[
          {id:1, nombre:'delantero'},
          {id:2, nombre:'centrocampista'},
          {id:3, nombre:'defensa'},
          {id:4, nombre:'portero'},
          ],
      }
    },
    methods: {
   async onSubmit(){
    if(this.imageData){
    if(navigator.onLine){
       var sec=new Date().getSeconds();
        const response = await firebase.storage()
              .ref(`jugadores/${sec}${this.imageData.name}`)
              .put(this.imageData);
        const url = await response.ref.getDownloadURL();
        this.jugador.foto =await url.toString();
        }
      }
      this.$axios.put(this.$path+`/Jugador/Update`,this.jugador).catch(e=>console.log(e));
      this.$router.go();
    },
      getLugar(){
			this.$axios.get(this.$path+"/lugar/All").then(response=>{
				this.lugares=response.data;
			}).catch(e=>console.log(e));
    },
   async llenar(){
      await	thos.$axios.get(this.$path+`/Jugador/FindBy/${this.jugador.id}`).then(response=>{
        this.jugador=response.data;
			}).catch(e=>console.log(e));
    },
    },
	created(){
		this.getLugar();
	  }
  }
</script>
<style>
 button{
   margin-left: 10px;
 }
 input, #input-1, #input-2, #input-5, #input-6{
text-align: center;
font-size: 20px;
width: 100%;
 }
</style>