<template>
  <b-modal id="modallistado" title="Listado de jugadores" hide-footer>
	  <h3 class="text-center"><strong>{{ titulo }}</strong></h3>
	  <div v-if="jugadores[0]!=null">
		  <table class="table table-inverse table-hover">
					<thead>			
  				 		<tr class="bg-dark text-light text-center">
			                <th>Foto</th>
	                        <th>Nombre</th>
	                        <th>Edad</th>
	                        <th>Posicion</th>
							<th>Dorsal</th>		               
	                    </tr>
	                </thead>
					<tbody class="bg-aqua text-center">
						<tr v-for="j in jugadores" :key="j.id">
							<td><img :src="j.foto" height="30px" width="40px" alt="foto"></td>
				        	<td>{{ j.jugador.persona.nombres+' '+j.jugador.persona.apellidos }}</td>			
				            <td>{{ j.jugador.persona.edad }}</td>	
							<td>{{ j.jugador.posicion }}</td>	
							<td>{{ j.dorsal }}</td>				                   				        
						</tr>
					</tbody>
				</table>
	  </div>
		 <b-card  v-else>
			 <b-card-text>
				 No hay ningun jugador
			 </b-card-text>
		 </b-card>	   
  </b-modal>
</template>
<script>
export default {
props:{
   idequipo:{
     type:Number,
    required:true,
    default:0
  },
  title:{
    type:String,
    required:true,
    default:''
	},
},
 watch:{
    idequipo: function(newvalue){
       this.equipo=newvalue;
      this.getJug();
	},
	title: function(newvalue){
       this.titulo=newvalue;
    }
  },
data(){
	  return{
		titulo:this.title,
		jugadores:[],
		equipo:this.idequipo,
	  }
  },
created(){
		this.getJug();
	},
	methods:{
	  getJug(){
			this.$axios.get(this.$path+`/carnet/jugadorDentro/${this.equipo}`).then(response=>{
				this.jugadores=response.data;
      		}).catch(e=>console.log(e));
		},
	}
}
</script>