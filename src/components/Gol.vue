<template>
  <b-modal id="modalGol" ref="modalGol" title="Ingresando gol" hide-footer>
    <div class="container" fluid v-if="gol != null">
      <form @submit.prevent="onSubmit">
        <b-form-group label="valor del gol">
          <b-form-radio-group v-model="gol.tipo">
            <b-form-radio name="radio1" value="true">A favor</b-form-radio>
            <b-form-radio name="radio2" value="false">En contra</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="equipo del jugador">
          <b-form-radio-group v-model="equipo">
            <b-form-radio :value="gol.partido.equipo1">{{
              gol.partido.equipo1.equipo.nombre
            }}</b-form-radio>
            <b-form-radio :value="gol.partido.equipo2">{{
              gol.partido.equipo2.equipo.nombre
            }}</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <b-form-group id="input-group-1" label="Forma:" label-for="input-1">
          <b-form-select id="input-1" v-model="gol.forma" required>
            <option v-for="e in formas" :key="e" :value="e">
              {{ e }}
            </option>
          </b-form-select>
        </b-form-group>
        <b-form-group id="input-group-2" label="Jugador:" label-for="input-2">
          <b-form-select id="input-2" v-model="gol.carnet" required>
            <option v-for="e in jugadores" :key="e.id" :value="e">
              {{ e.jugador.persona.nombres }}
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
import Swal from "sweetalert2";
export default {
  props: {
    idpartido: {
      type: Number,
      required: true,
      default: 0
    }
  },
  watch: {
    idpartido(value) {
      this.gol.partido.idp = value;
      this.getPartido();
      this.getJugador();
    },
    equipo() {
      this.getJugador();
    }
  },
  data() {
    return {
      equipo: {},
      gol: {
        forma: "Jugada normal",
        tipo: true,
        carnet: {},
        partido: {
          idp: this.idpartido,
          equipo1: {
            id: 0,
            equipo: {
              nombre: ""
            }
          },
          equipo2: {
            id: 0,
            equipo: {
              nombre: ""
            }
          }
        }
      },
      formas: ["Jugada normal", "Tiro libre", "Penal", "cabeza"],
      jugadores: []
    };
  },
  methods: {
    async onSubmit() {
      const URL = this.$path + "/gol/Add";
      await this.$axios.post(URL, this.gol).catch(e => console.log(e));
      await Swal.fire({
        position: "top-end",
        type: "success",
        title: "Se ha agregado",
        showConfirmButton: false,
        timer: 1500
      });
    },
    async getJugador() {
      await this.$axios
        .get(this.$path + `/carnet/FindAll/${this.equipo.id}`)
        .then(response => {
          this.jugadores = response.data;
        })
        .catch(e => console.log(e));
      this.gol.carnet = this.jugadores[0];
    },
    async getPartido() {
      await this.$axios
        .get(this.$path + `/partido/FindBy/${this.gol.partido.idp}`)
        .then(response => {
          this.gol.partido = response.data;
        })
        .catch(e => console.log(e));
      this.equipo = this.gol.partido.equipo1;
    }
  }
};
</script>
