<template>
  <v-container v-if="partido.equipo1 != undefined">
    <div class="text-center" v-if="formacionList.length < 1">
      <v-btn rounded color="primary" dark @click="formacion()">Formación</v-btn>
    </div>
    <v-row
      class="custom text-center"
      v-else-if="!finalizado"
      align="center"
      justify="center"
    >
      <v-btn rounded color="indigo" dark v-if="!inicio" @click="iniciar"
        >Iniciar</v-btn
      >
      <div v-if="inicio">
        <v-btn rounded color="indigo" v-if="!pausa" dark @click="goles()"
          >Goles</v-btn
        >
        <v-btn rounded color="indigo" v-if="!pausa" dark @click="tarjeta()"
          >Tarjeta</v-btn
        >
        <v-btn rounded color="indigo" v-if="!pausa" dark @click="cambio()"
          >Cambio</v-btn
        >
        <v-btn
          rounded
          color="indigo"
          dark
          v-if="!medio & (tiempo == 45)"
          @click="mediotiempo()"
          >Medio tiempo</v-btn
        >
        <v-btn rounded color="indigo" dark v-if="pausa" @click="reanudar()"
          >Reanudar</v-btn
        >
        <v-btn
          rounded
          color="indigo"
          dark
          v-if="medio & (tiempo == 90)"
          @click="finalizar()"
          >Finalizar</v-btn
        >
      </div>
    </v-row>
    <v-col id="content" class="text-center">
      <v-card align="center">
        <v-row align="center" justify="center" v-if="inicio">
          <v-spacer></v-spacer>
          <div v-if="finalizado">
            <span class="spam1">Finalizado</span>
          </div>
          <div v-else>
            <span class="spam1" v-if="(extra == 0) & !pausa"
              >{{ tiempo }}'</span
            >
            <span class="spam1" v-else-if="!pausa & (extra > 0)"
              >{{ tiempo }}<span>+{{ extra }}</span
              >'</span
            >
            <span class="spam1" v-else>Descanso</span>
          </div>
        </v-row>
        <v-row>
          <v-col>
            <img
              :src="partido.equipo1.equipo.logo"
              alt="logo1"
              width="100px"
              height="100px"
            />
            <p>{{ partido.equipo1.equipo.nombre }}</p>
          </v-col>
          <v-col>
            <v-row align="center" justify="center" v-if="!this.inicio">
              <v-col cols="12">
                <span><strong>Dia:</strong>{{ partido.horario.dia }}</span>
              </v-col>
              <v-col cols="12">
                <span><strong>Hora:</strong>{{ partido.horario.hora }}</span>
              </v-col>
            </v-row>
            <v-row align="center" v-else>
              <v-row class="h3" align="center" justify="center">
                <span>{{ gol1 }}</span>
                <v-spacer></v-spacer>
                <span>-</span>
                <v-spacer></v-spacer>
                <span>{{ gol2 }}</span>
              </v-row>
            </v-row>
          </v-col>
          <v-col>
            <img
              :src="partido.equipo2.equipo.logo"
              alt="logo1"
              width="100px"
              height="100px"
            />
            <p>{{ partido.equipo2.equipo.nombre }}</p>
          </v-col>
        </v-row>
      </v-card>
      <v-divider />
      <v-tabs fixed-tabs v-model="tabs" centered slider-color="white">
        <v-tab>Cronologia</v-tab>
        <v-tab>Alineación</v-tab>
        <v-tab>Resumen</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card>
            <v-container fluid grid-list-lg>
              <v-card v-for="l in listamensje" :key="l.minuto">
                <v-card-title primary-title>
                  <v-row
                    v-if="
                      (l.titulo == 'final del partido') | (l.titulo == 'inicio')
                    "
                  >
                    <img height="30px" width="30px" :src="l.img" />
                    <v-spacer></v-spacer>
                    <span>{{ l.titulo }}</span>
                  </v-row>
                  <v-row v-else>
                    <img height="30px" width="30px" :src="l.img" />
                    <span>{{ l.titulo }}</span>
                    <v-row v-if="l.titulo == 'gol'">
                      <v-spacer></v-spacer>
                      <v-row style="width:10px;">
                        <v-spacer></v-spacer>
                        <span>{{ l.favor }}</span>
                        <v-spacer></v-spacer>
                        <span>-</span>
                        <v-spacer></v-spacer>
                        <span>{{ l.contra }}</span>
                      </v-row>
                    </v-row>
                  </v-row>
                  <v-spacer></v-spacer>
                  <span class="spam1">{{ l.minuto }}'</span>
                </v-card-title>
                <v-card-text v-if="l.titulo == 'cambio'" id="cambio">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-2" style=" color:dodgerblue;">
                        Entra
                      </div>
                      <v-list-item-title class="headline mb-1"
                        >{{ l.jugador1.persona.nombres }}
                        {{ l.jugador1.persona.apellidos }}</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        l.jugador1.posicion
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-row align="center" justify="center">
                      <img
                        :src="l.jugador1.foto"
                        width="60px"
                        height="60px"
                        style="border-radius:30px;"
                      />
                    </v-row>
                  </v-list-item>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-2" style=" color:red;">
                        Sale
                      </div>
                      <v-list-item-title class="headline mb-1">
                        {{ l.jugador2.persona.nombres }}
                        {{ l.jugador2.persona.apellidos }}</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        l.jugador1.posicion
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-row align="center" justify="center">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/action-gol.appspot.com/o/jugadores%2F52images%20(16).jpg?alt=media&token=e03b9436-aa98-471d-9cc9-2ba9f944a751"
                        width="60px"
                        height="60px"
                        style="border-radius:30px;"
                      />
                    </v-row>
                  </v-list-item>
                </v-card-text>

                <v-card-text v-if="l.titulo == 'gol'" id="gol">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1"
                        >{{ l.jugador1.persona.nombres }}
                        {{ l.jugador1.persona.apellidos }}</v-list-item-title
                      >
                      <v-list-item-subtitle
                        ><img
                          height="20px"
                          width="20px"
                          src="https://cdn2.iconfinder.com/data/icons/sports-colored-icons-vol-1-1/128/24-128.png"
                        />{{ l.dato }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                    <v-row align="center" justify="center">
                      <img
                        :src="l.jugador1.foto"
                        width="60px"
                        height="60px"
                        style="border-radius:30px;"
                      />
                    </v-row>
                  </v-list-item>
                </v-card-text>
                <v-card-text
                  v-if="
                    (l.titulo == 'tarjeta amarilla') |
                      (l.titulo == 'tarjeta roja') |
                      (l.titulo == 'doble amarilla') |
                      (l.titulo == 'roja y amarilla')
                  "
                  id="tarjeta"
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1"
                        >{{ l.jugador1.persona.nombres }}
                        {{ l.jugador1.persona.apellidos }}</v-list-item-title
                      >
                    </v-list-item-content>
                    <v-row align="center" justify="center">
                      <img
                        :src="l.jugador1.foto"
                        width="60px"
                        height="60px"
                        style="border-radius:30px;"
                      />
                    </v-row>
                  </v-list-item>
                </v-card-text>
              </v-card>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <div v-if="formacionList.length < 1">
            <v-card>
              <v-card-text>
                No se ha ingresado las formaciones
              </v-card-text>
            </v-card>
          </div>
          <div class="recuadro" v-else>
            <div class="equipo">
              <div class="marco">
                <div class="marco1"></div>
              </div>
              <div class="arco rotar arco1"></div>
              <v-row class="seccion por" align="center" justify="center" dense>
                <div v-for="p in portero1" :key="p.id">
                  <v-col>
                    <img
                      :src="p.jugador.foto"
                      width="50px"
                      height="50px"
                      style="border-radius:25px;"
                    />
                  </v-col>
                  <span>{{ p.jugador.persona.nombres }}</span>
                </div>
              </v-row>
              <v-row
                class="seccion def"
                align="center"
                justify="space-between"
                dense
              >
                <div v-for="p in defensa1" :key="p.id">
                  <v-col>
                    <img
                      :src="p.jugador.foto"
                      width="50px"
                      height="50px"
                      style="border-radius:25px;"
                    />
                  </v-col>
                  <span>{{ p.jugador.persona.nombres }}</span>
                </div>
              </v-row>
              <v-row
                class="seccion cm"
                align="center"
                justify="space-around"
                dense
              >
                <div v-for="p in centrocampista1" :key="p.id">
                  <v-col>
                    <img
                      :src="p.jugador.foto"
                      width="50px"
                      height="50px"
                      style="border-radius:25px;"
                    />
                  </v-col>
                  <span>{{ p.jugador.persona.nombres }}</span>
                </div>
              </v-row>
              <v-row
                class="seccion def"
                align="center"
                justify="space-around"
                dense
              >
                <div v-for="p in delantero1" :key="p.id">
                  <v-col>
                    <img
                      :src="p.jugador.foto"
                      width="50px"
                      height="50px"
                      style="border-radius:25px;"
                    />
                  </v-col>
                  <span>{{ p.jugador.persona.nombres }}</span>
                </div>
              </v-row>
            </div>
            <div class="equipo equipo2">
              <div class="circulo rotar"></div>
              <div class="arco rotar arco2"></div>
              <div class="marco marco2">
                <div class="marco1 marco12"></div>
              </div>
              <v-row
                class="seccion del"
                align="center"
                justify="space-around"
                dense
              >
                <div v-for="p in delantero2" :key="p.id">
                  <span>{{ p.jugador.persona.nombres }}</span>
                  <v-col>
                    <img
                      :src="p.jugador.foto"
                      width="50px"
                      height="50px"
                      style="border-radius:25px;"
                    />
                  </v-col>
                </div>
              </v-row>
              <v-row
                class="seccion"
                align="center"
                justify="space-around"
                dense
              >
                <div v-for="p in centrocampista2" :key="p.id">
                  <span>{{ p.jugador.persona.nombres }}</span>
                  <v-col>
                    <img
                      :src="p.jugador.foto"
                      width="50px"
                      height="50px"
                      style="border-radius:25px;"
                    />
                  </v-col>
                </div>
              </v-row>
              <v-row
                class="seccion"
                align="center"
                justify="space-between"
                dense
              >
                <div v-for="p in defensa2" :key="p.id">
                  <span>{{ p.jugador.persona.nombres }}</span>
                  <v-col>
                    <img
                      :src="p.jugador.foto"
                      width="50px"
                      height="50px"
                      style="border-radius:25px;"
                    />
                  </v-col>
                </div>
              </v-row>
              <v-row class="seccion" align="center" justify="center" dense>
                <div v-for="p in portero2" :key="p.id">
                  <span>{{ p.jugador.persona.nombres }}</span>
                  <v-col>
                    <img
                      :src="p.jugador.foto"
                      width="50px"
                      height="50px"
                      style="border-radius:25px;"
                    />
                  </v-col>
                </div>
              </v-row>
            </div>
          </div>
        </v-tab-item>
        <v-tab-item>
          <v-timeline align-top dense>
            <v-timeline-item
              v-for="m in mensajes"
              :key="m.minuto"
              :color="color(m.tipo)"
            >
              <template v-slot:icon>
                <v-avatar>
                  <span class="headline  darken-2">{{ m.minuto }}</span>
                </v-avatar>
              </template>
              <v-card class="elevation-2">
                <v-card-text>
                  <v-avatar>
                    <img :src="imagen(m.equipo)" />
                  </v-avatar>
                  <span class="headline text-center darken-1"
                    ><strong>{{ m.tipo }}</strong></span
                  >
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-container>
</template>
<script>
export default {
  computed: {
    listamensje() {
      var lista = [];
      var gol1 = 0;
      var gol2 = 0;
      this.mensajes
        .filter(x => x.tipo == "gol")
        .forEach(x => {
          if (x.equipo) {
            gol1++;
          } else {
            gol2++;
          }
        });
      if (this.finalizado) {
        var min = 0;
        var extra = 0;
        var now;
        var sec = this.$moment(Date.parse(this.partido.segundot));
        if (this.partido.finalizado != null) {
          now = this.$moment(Date.parse(this.partido.finalizado));
        } else {
          now = this.$moment(new Date());
        }
        var minutos = Math.round(now.diff(sec, "seconds") / 60);
        if (minutos > 45) {
          min = 90;
          extra = minutos - 45;
        } else {
          min = 90;
        }
        var minu = "";
        if (extra == 0) {
          minu = min.toString;
        } else {
          minu = min + "+" + extra;
        }
        lista.push({
          titulo: "final de partido",
          img: this.lista.find(x => x.titulo == "final").img,
          minuto: minu
        });
      }
      this.mensajes.forEach(x => {
        lista.push({
          titulo: x.tipo,
          dato: x.dato,
          img: this.lista.find(t => t.titulo == x.tipo).img,
          minuto: x.minuto,
          favor: gol1,
          contra: gol2,
          jugador1: x.jugador1,
          jugador2: x.jugador2
        });
        if (x.tipo == "gol") {
          if (x.equipo) {
            gol1--;
          } else {
            gol2--;
          }
        }
      });
      if (this.inicio) {
        var ini = new Date(this.partido.fecha);
        lista.push({
          titulo: "inicio del partido",
          img: this.lista.find(x => x.titulo == "inicio").img,
          minuto: ini.getHours().toString() + ":" + ini.getMinutes()
        });
      }
      return lista;
    },
    portero1() {
      return this.carnet1List.filter(x => x.jugador.posicion == "portero");
    },
    portero2() {
      return this.carnet2List.filter(x => x.jugador.posicion == "portero");
    },
    defensa1() {
      return this.carnet1List.filter(x => x.jugador.posicion == "defensa");
    },
    defensa2() {
      return this.carnet2List.filter(x => x.jugador.posicion == "defensa");
    },
    centrocampista1() {
      return this.carnet1List.filter(
        x => x.jugador.posicion == "centrocampista"
      );
    },
    centrocampista2() {
      return this.carnet2List.filter(
        x => x.jugador.posicion == "centrocampista"
      );
    },
    delantero1() {
      return this.carnet1List.filter(x => x.jugador.posicion == "delantero");
    },
    delantero2() {
      return this.carnet2List.filter(x => x.jugador.posicion == "delantero");
    }
  },
  data() {
    return {
      tiempo: 0,
      extra: 0,
      inicio: false,
      medio: false,
      pausa: false,
      finalizado: false,
      formacionList: [],
      carnet1List: [],
      carnet2List: [],
      mensajes: [],
      partido: {},
      gol1: 0,
      gol2: 0,
      letra: "cambio",
      lista: [
        {
          img:
            "https://cdn0.iconfinder.com/data/icons/football-35/64/whistle-referee-whistles-sound-256.png",
          titulo: "final"
        },
        {
          img:
            "https://cdn3.iconfinder.com/data/icons/arrows-218/128/arrows-19-256.png",
          titulo: "cambio"
        },
        {
          img:
            "https://cdn1.iconfinder.com/data/icons/road-to-worldcup-filled-line/128/13_shot_goal_soccer_football_sport-256.png",
          titulo: "gol"
        },
        {
          img:
            "https://cdn4.iconfinder.com/data/icons/football-element-1/64/yellow_card_card_amonestation_football_referee_rules_referee_football-128.png",
          titulo: "tarjeta amarilla"
        },
        {
          img:
            "https://cdn4.iconfinder.com/data/icons/football-element-1/64/red_card_card_amonestation_football_referee_rules_referee_football-256.png",
          titulo: "tarjeta roja"
        },
        {
          img:
            "https://cdn4.iconfinder.com/data/icons/football-soccer-sports-outline/512/yellow_red_card_foul_penalty_referee_competition-128.png",
          titulo: "doble amarilla"
        },
        {
          img:
            "https://cdn2.iconfinder.com/data/icons/kick-off/450/Red-card-256.png",
          titulo: "roja y amarilla"
        },
        {
          img:
            "https://cdn2.iconfinder.com/data/icons/american-football-15/64/referee-sports-competition-avatar-256.png",
          titulo: "inicio"
        },
        {
          img:
            "https://cdn2.iconfinder.com/data/icons/football-26/256/football-soccer-drink-water-halftime-break-256.png",
          titulo: "medio"
        },
        {
          img:
            "https://cdn2.iconfinder.com/data/icons/american-football-16/64/referee-sports-competition-avatar-256.png",
          titulo: "reanudar"
        }
      ],
      tabs: null
    };
  },
  methods: {
    color(v) {
      if ((v == "tarjeta roja") | (v == "roja y amarilla")) {
        return "red";
      } else if ((v == "tarjeta amarilla") | (v == "doble amarilla")) {
        return "yellow";
      } else if (v == "cambio") {
        return "green";
      } else {
        return "blue";
      }
    },
    imagen(v) {
      if (v) {
        return this.partido.equipo1.equipo.logo;
      }
      return this.partido.equipo2.equipo.logo;
    },
    goles() {
      this.$router.push({
        name: "gol",
        params: {
          id: this.$route.params.id,
          minuto: this.tiempo
        }
      });
    },
    cambio() {
      this.$router.push({
        name: "cambio",
        params: {
          id: this.$route.params.id,
          minuto: this.tiempo
        }
      });
    },
    tarjeta() {
      this.$router.push({
        name: "tarjeta",
        params: {
          id: this.$route.params.id,
          minuto: this.tiempo
        }
      });
    },
    temporal() {
      if (this.partido.descanso != null) {
        this.inicio = true;
        if (this.partido.descanso == 1) {
          this.medio = true;
          this.pausa = true;
        } else if (this.partido.descanso == 2) {
          this.medio = true;
          this.pausa = false;
        } else if (this.partido.descanso == 3) {
          this.medio = true;
          this.pausa = false;
          this.finalizado = true;
        }
        this.tiempov();
      }
    },
    intervalo() {
      setInterval(() => {
        if (!this.finalizado) {
          if (!this.medio & (this.tiempo == 45)) {
            this.extra++;
          } else if (this.medio & (this.tiempo == 90)) {
            this.extra++;
          } else if (!this.pausa) {
            this.tiempo += 1;
          }
        }
      }, 598);
      //  }, 59998);
    },
    tiempov() {
      if (this.partido.descanso != 3) {
        if (this.partido.descanso == 0) {
          var ini = this.$moment(Date.parse(this.partido.fecha));
          var now = this.$moment(new Date());
          var minutos = Math.round(now.diff(ini, "seconds") / 60);
          if (minutos > 45) {
            this.tiempo = 45;
            this.extra = minutos - 45;
          } else {
            this.tiempo = minutos;
          }
        } else if (this.partido.descanso == 1) {
          this.tiempo = 45;
        } else if (this.partido.descanso == 2) {
          var sec = this.$moment(Date.parse(this.partido.segundot));
          var now = this.$moment(new Date());
          var minutos = Math.round(now.diff(sec, "seconds") / 60);
          if (minutos > 45) {
            this.tiempo = 90;
            this.extra = minutos - 45;
          } else {
            this.tiempo = minutos + 45;
          }
        }
        this.intervalo();
      }
    },
    formacion() {
      var id = parseInt(this.$route.params.id, 10);
      this.$router.push({
        name: "formacion",
        params: {
          id: id
        }
      });
    },
    async gol(id) {
      await this.$axios
        .get(this.$path + "/gol/Number/" + id + "/1")
        .then(response => {
          this.gol1 = response.data;
        })
        .catch(e => console.log(e));
      await this.$axios
        .get(this.$path + "/gol/Number/" + id + "/2")
        .then(response => {
          this.gol2 = response.data;
        })
        .catch(e => console.log(e));
    },
    async llenar(id) {
      await this.$axios
        .get(this.$path + "/partido/FindBy/" + id)
        .then(response => {
          this.partido = response.data;
        })
        .catch(e => console.log(e));
      this.mensaje();
      this.gol(id);
      this.getFormacion(id);
      this.temporal();
    },
    async getFormacion(id) {
      await this.$axios
        .get(this.$path + "/formacion/FindAll/" + id)
        .then(response => {
          this.formacionList = response.data;
        })
        .catch(e => console.log(e));
      if (this.formacionList.length > 0) {
        this.getF1(this.$route.params.id);
        this.getF2(this.$route.params.id);
      }
    },
    async getF1(id) {
      await this.$axios
        .get(this.$path + "/carnet/dentro/" + id + "/1")
        .then(response => {
          this.carnet1List = response.data;
        })
        .catch(e => console.log(e));
    },
    async getF2(id) {
      await this.$axios
        .get(this.$path + "/carnet/dentro/" + id + "/2")
        .then(response => {
          this.carnet2List = response.data;
        })
        .catch(e => console.log(e));
    },
    async iniciar() {
      await this.$axios
        .get(this.$path + "/partido/iniciar/" + this.$route.params.id)
        .catch(e => console.log(e));
      this.inicio = true;
      this.intervalo();
    },
    async mediotiempo() {
      await this.$axios
        .get(this.$path + "/partido/descanso/" + this.$route.params.id)
        .catch(e => console.log(e));
      this.medio = true;
      this.extra = 0;
      this.pausa = true;
    },
    async reanudar() {
      await this.$axios
        .get(this.$path + "/partido/reanudar/" + this.$route.params.id)
        .catch(e => console.log(e));
      this.pausa = false;
    },
    async finalizar() {
      await this.$axios
        .get(this.$path + "/partido/finalizar/" + this.$route.params.id)
        .catch(e => console.log(e));
      this.finalizado = true;
      this.$axios
        .get(this.$path + "/tabla/ingreso/" + this.$route.params.id)
        .catch(e => console.log(e));
    },
    async mensaje() {
      await this.$axios
        .get(this.$path + "/partido/mensaje/" + this.$route.params.id)
        .then(x => {
          this.mensajes = x.data;
        })
        .catch(e => console.log(e));
    }
  },
  mounted() {
    this.llenar(this.$route.params.id);
  }
};
</script>
<style>
.spam1 {
  color: green;
  font-size: 20px;
  margin-right: 15px;
  margin-top: 15px;
}
.custom button {
  margin-right: 10px;
}
#content {
  width: 70%;
  margin-left: 15%;
}
div {
  display: block;
  position: relative;
}
.recuadro {
  width: 100%;
  height: 1020px;
  background-color: seagreen;
  color: #000;
}
.equipo,
.marco,
.marco1,
.arco,
.circulo {
  border: 1px solid rgba(187, 196, 202, 0.66);
}
.equipo {
  height: 510px;
}
.marco {
  width: 50%;
  background-color: seagreen;
  height: 135px;
  margin-left: 25%;
  z-index: 2;
}
.marco2 {
  margin-top: 4%;
}
.marco1 {
  width: 40%;
  margin-left: 30%;
  background-color: seagreen;
  height: 65px;
}
.marco12 {
  top: 69px;
}
.arco {
  margin-left: 40%;
  width: 20%;
  padding-top: 20%;
}
.arco1 {
  top: 0;
  z-index: 1;
}
.arco2 {
  top: 38%;
}
.circulo {
  margin-left: 37%;
  width: 25%;
  padding-top: 25%;
}
.rotar {
  transform: translateY(-50%) rotate(-45deg);
  border-radius: 50%;
}
.seccion {
  height: 23%;
  width: 90%;
  text-align: center;
  z-index: 3;
  left: 7%;
}
.por {
  top: 0;
  margin-top: -39%;
}
.del {
  top: 0;
  margin-top: -62%;
}
span {
  color: black;
}
.recuadro span {
  color: white;
}
</style>
