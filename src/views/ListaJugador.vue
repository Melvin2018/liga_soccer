<template>
    <div id="listadoJ" fluid>
        <b-container>
			<div class="bg-center">
				<b-button v-b-modal.modal1>Agregar Jugador</b-button>
			</div>
			<b-input type="text" 
			v-model="name" 
			id="buscador"
			class="mt-5" 
			autocomplete placeholder="Ingrese el nombre"></b-input>
				<table class="table table-inverse table-hover text-center">
					<thead>			
  				 		<tr class="bg-dark text-light">
			                <th>Foto</th>
	                        <th>Nombre</th>
	                        <th>Dui</th>
	                        <th>Altura</th>
	                        <th>Edad</th>
	                        <th>Posicion</th>
							<th>Lugar</th>
	                        <th>Opciones</th>			               
	                    </tr>
	                </thead>
					<tbody>
						<tr v-for="j in search" :key="j.id">
							<td><img :src="j.foto" height="40px" width="60px" alt="foto"></td>
				        	<td>{{ j.persona.nombres+' '+j.persona.apellidos }}</td>
				            <td>{{ j.persona.dui }}</td>		
				            <td>{{ j.persona.altura }}</td>		
				            <td>{{ j.persona.edad }}</td>	
							<td>{{ j.posicion }}</td>	
							<td>{{ j.persona.lugar.nombre }}</td>				                   
							<td>
								<b-btn class="btn-success" ref="btnShow" @click="editar(j.id)">Editar</b-btn> 
								<b-btn @click="eliminar(j.id)" class="btn-danger">Eliminar</b-btn>
							</td>				        
						</tr>
					</tbody>
				</table>  
        </b-container>
		<Modal></Modal>
		<Modal1 :id="id"></Modal1>
    </div>
</template>
<script>
import axios from 'axios'
import Modal from '@/components/ModalJ'
import Modal1 from '@/components/ModalJ1'
import Swal from 'sweetalert2'
export default {
	components:{
	Modal,
	Modal1
	},
	data(){
		return{
		id:0,
		size:0,
		name:'',
		jugadores:[]
		};	
	},
	mounted(){
		this.getJug();
	},
	 computed: {
        search: function () {
			return this.jugadores.filter((item) => 
			item.persona.nombres.toUpperCase().includes(this.name.toUpperCase())
			|item.persona.apellidos.toUpperCase().includes(this.name.toUpperCase()));
		}, 
		size: function(){
			return this.jugadores.length;
		}
	},
	methods:{
	editar(id){
		this.id=id;
		this.$root.$emit('bv::show::modal','modalEdit','#btnShow');
	},
	async getJug(){
    const URL = "http://192.168.43.17:8080/Jugador/All"
    await axios.get(URL).then(response=>{
			this.jugadores=response.data;
		}).catch(e=>console.log(e));
	},
	eliminar(id){
		const URL = `http://192.168.43.17:8080/Jugador/Delete/${id}`
			axios.delete(URL).then(x=> {
				this.getJug();
				var b=x.data;
				if(b){
					Swal.fire({
					position: 'top-end',
					type: 'success',
					title: 'Se ha eliminado',
					showConfirmButton: false,
					timer: 1500
				});
				}else{
					Swal.fire({
					type: 'error',
					title: 'Oops...',
					text: 'no puede eliminar este jugador!',
				});
			}}).catch(e=>console.log(e));
		}
	}
}
</script>
<style>
#buscador{
	width: 80%;
	margin-bottom: 10px;
}
table{
	background-color:darkgray;
}
</style>