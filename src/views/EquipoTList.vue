<template>
<b-container>
      <div class="card-deck">
              <b-button v-if="showa" v-b-modal.modal class="btn btn-dark">Agregar equipo</b-button>
              <b-button v-if="showg" id="boton" :disabled="load"
              class="btn btn-dark" @click="generar">Generar partidos</b-button>
    </div>
        <div class="row">
				<table class="table table-inverse table-hover mt-5 table-bordered">
					<thead>			
  				 		<tr class="bg-dark text-light text-center">
			                <th>Logo</th>
	                    <th>Equipo</th>
	                    <th>Lugar</th>
                      <th>Representante</th>
	                    <th>Jugadores</th>	
                      <th>llenado</th>	
                      <th>Opcion</th>               
	                    </tr>
	              </thead>
					<tbody class="text-center border-dark">
						<tr v-for="e in equipos" :key="e.id">
                      <td><img :src="e.equipo.equipo.logo" height="40px" width="60px" alt="foto"></td>
                      <td>{{ e.equipo.equipo.nombre }}</td> 
                      <td>{{ e.equipo.equipo.lugar.nombre }}</td>
		                  <td>{{ e.equipo.representante.persona.nombres }}</td>	
                      <td><b-button
                        class="btn btn-info"
                        @click="llenar1(e.equipo.id, e.equipo.equipo.nombre)"
                        ref="btnShow1">Jugadores</b-button>
                      </td>	
						         	<td><b-progress :max="18" :value="e.integrantes" show-value animated></b-progress></td>  
                      <td><b-button @click="llenar(e.equipo.id)"
                      ref="btnShow"
                      :disabled="e.integrantes==18"
                      class="btn-outline-dark"
                      id="boton1">Agregar Jugador</b-button></td>                 				        
						</tr>
					</tbody>
				</table>
		    </div>  
        <Modal :idequipo="id"></Modal>
        <Modal1></Modal1>
        <Lista :idequipo="id" :title="nombre"></Lista>
</b-container>
</template>
<script>
import Modal from '@/components/CModal'
import Modal1 from '@/components/ETModal'
import Lista from '@/components/Jugadores'
export default {
  components:{
    Modal,
    Lista,
    Modal1
  },
    data(){
        return{ 
            load:false,
            id:0,
            nombre:'',
            showa:false,
            showg:false,
            equipos:[]
        };     
    },
    mounted(){
		this.getList();
    this.getval();
    this.getshowg();
  },
    methods:{
    async  generar(){
      this.load=true;
        const URL = this.$path+"/partido/Generar"
       await this.$axios.get(URL).catch(e=>console.log(e));
        this.$router.push('/partidos');
      },
      llenar(ids){
        this.id=ids;
        this.$root.$emit('bv::show::modal','modal1','#btnShow');
      },
      llenar1(ids, nom){
        this.id=ids;
        this.nombre=nom;
        this.$root.$emit('bv::show::modal','modallistado','#btnShow1');
      },
		getList(){
    const URL = this.$path+"/equipoT/dentro"
    this.$axios.get(URL).then(response=>{
				this.equipos=response.data;
			    }).catch(e=>console.log(e));
        },
    getshowg(){
    const URL = this.$path+"/temporada/showg"
    this.$axios.get(URL).then(response=>{
        this.showg=response.data;
        if(response.data==null){
          load=true;
        }
			}).catch(e=>console.log(e));
    },
	getval(){
    const URL = this.$path+"/temporada/showa"
     this.$axios.get(URL).then(response=>{
                this.showa=response.data;
            }).catch(e=>console.log(e));
		},
  }
}
</script>
<style>
table{
	background-color:darkgray;
}
#boton{
  margin-left:10px;
}
</style>