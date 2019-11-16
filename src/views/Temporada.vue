<template>
 <b-container>
			<div class="bg-center">
				<b-button v-b-modal.tempoModal v-if="nt">Nueva temporada</b-button>
			</div>
            <div class="row">
				<table class="table table-inverse table-hover mt-5">
					<thead>			
  				 		<tr class="bg-dark text-light">
			                <th>Numero</th>
	                        <th>FechaInicial</th>
							 <th>FechaFinal</th>
	                        <th>Campeon</th>		               
	                    </tr>
	                </thead>
					<tbody>
						<tr v-for="t in temporadas" :key="t.id">
				        	<td>{{ t.numeroe }}</td>
				            <td>{{ j.campeon.temporada.fechaIni }}</td>	
                            <td>{{ j.ff }}</td>	
							<td>{{ j.campeon.equipo.nombre }}</td>                   				        
						</tr>
					</tbody>
				</table>
		    </div>	      
		 <Temporada></Temporada> 
        </b-container>
</template>
<script>
import axios from 'axios'
import Temporada from '../components/TemporadaN'
export default {
components:{
 Temporada,
},
data(){
		return{
			nt:false,
			temporadas:[]
			};	
	},
	mounted(){
		this.getList();
		this.getval();
	},
	methods:{
		getList(){
    const URL = "http://192.168.43.17:8080/temporada/antiguo"
     axios.get(URL).then(response=>{
				this.temporadas=response.data;
			}).catch(e=>console.log(e));
		},
	getval(){
    const URL = "http://192.168.43.17:8080/temporada/val"
    axios.get(URL).then(response=>{
				this.nt=response.data;
			}).catch(e=>console.log(e));
		},
    }
}
</script>
