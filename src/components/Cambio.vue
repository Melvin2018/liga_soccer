<template>
  <b-modal
    id="modalCambio"
    ref="modalCambio"
    title="Ingresando cambio"
    hide-footer
  >
    <div class="container" fluid v-if="cambio != null">
      <form @submit.prevent="onSubmit">
        <b-form-group label="equipo del jugador">
          <b-form-radio-group v-model="equipo">
            <b-form-radio :value="cambio.partido.equipo1">{{
              cambio.partido.equipo1.equipo.nombre
            }}</b-form-radio>
            <b-form-radio :value="cambio.partido.equipo2">{{
              cambio.partido.equipo2.equipo.nombre
            }}</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <b-form-group id="input-group-1" label="razon:" label-for="input-1">
          <b-form-select id="input-1" v-model="cambio.razon" required>
            <option v-for="e in razones" :key="e" :value="e">
              {{ e }}
            </option>
          </b-form-select>
        </b-form-group>
        <v-row align="center" justify="center">
          <b-form-group
            id="input-group-2"
            label="saliente:"
            label-for="input-2"
            class="group-input"
          >
            <b-form-radio-group v-model="cambio.saliente">
              <b-form-radio
                v-for="j in jugadores"
                :key="j.id"
                :value="j"
                style="width: 40%"
              >
                {{ j.jugador.persona.nombres }}
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group
            id="input-group-3"
            label="entrante:"
            label-for="input-3"
            class="group-input"
          >
            <b-form-radio-group v-model="cambio.entrante">
              <b-form-radio
                v-for="j in jugadores"
                :key="j.id"
                :value="j"
                style="width: 41%"
              >
                {{ j.jugador.persona.nombres }}
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </v-row>
        <b-button-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
        </b-button-group>
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
      this.cambio.partido.idp = value;
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
      cambio: {
        razon: "Normal",
        entrante: {},
        saliente: {},
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
      razones: ["Normal", "Lesión", "Cansancio"],
      jugadores: []
    };
  },
  methods: {
    async onSubmit() {
      const URL = this.$path + "/cambio/Add";
      await this.$axios.post(URL, this.cambio).catch(e => console.log(e));
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
    },
    async getPartido() {
      await this.$axios
        .get(this.$path + `/partido/FindBy/${this.cambio.partido.idp}`)
        .then(response => {
          this.cambio.partido = response.data;
        })
        .catch(e => console.log(e));
      this.equipo = this.cambio.partido.equipo1;
    }
  }
};
</script>
<style>
.group-input {
  width: 49%;
  border: 1px solid rgb(187, 171, 171);
  text-align: center;
}
</style>
