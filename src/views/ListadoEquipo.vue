<template>
    <div id="listadoE" fluid>
        <b-container>
			<div class="absolute-center">
				<b-button v-b-modal.modal2>Agregar Equipo</b-button>
			</div>
				<table class="table table-inverse table-hover mt-5 text-center">
					<thead>			
  				 		<tr class="bg-dark text-light">
			                <th>Foto</th>
	                        <th>Nombre</th>
	                        <th>Lugar</th>
	                        <th>Opciones</th>			               
	                    </tr>
	                </thead>
					<tbody>
						<tr v-for="e in equipos" :key="e.id">
							<td><img :src="e.logo" height="60px" width="60px" alt="foto"></td>
				        	<td>{{ e.nombre }}</td>
				            <td>{{ e.lugar.nombre }}</td>			                   
							<td>
								<b-btn @click="editar(e.id)" class="btn-success" ref="btnShow">Editar</b-btn> 
							 	<b-btn @click="eliminar(e.id)" class="btn-danger">Eliminar</b-btn>
							</td>				        
						</tr>
					</tbody>
				</table>	   
        </b-container>
		<Modal></Modal>
		<Modal1 :idequipo="idequipo"></Modal1>
    </div>
</template>
<script>
import Modal from '@/components/ModalE'
import Modal1 from '@/components/ModalE1'
import Swal from 'sweetalert2'
export default {
	components:{
	 Modal,
	 Modal1
	},
	data(){
		return{
			idequipo:0,
			equipos:[]
		};	
	},
	mounted(){
		this.getList();
	},
	methods:{
		editar(ids){
		this.idequipo=ids;
		this.$root.$emit('bv::show::modal','modalEdit','#btnShow');
		},
		async getList(){
		await this.$axios.get(this.$path+"/equipo/All").then(response=>{
				this.equipos=response.data;
			}).catch(e=>console.log(e));
		},
		eliminar(id){
			const URL = this.$path+`/equipo/Delete/${id}`
			THIS.$axios.delete(URL).then(x=> {
			this.getList();
				if(x.data){
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
				text: 'No puede eliminar este equipo!',
			});
			}}).catch(e=>console.log(e));
		},
	}
}
</script>
<style>
table{
	background-color:darkgray;
}
button{
	margin-left: 10px;
}
</style>