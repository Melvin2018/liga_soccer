<template>
  <v-container>
    <div
      class="text-center"
      v-if="(p.formacionList[0] == null) | (p.formacionList[1] == null)"
    >
      <v-btn rounded color="primary" dark ref="btnShow4" @click="formacion()">Formación</v-btn>
    </div>
    <v-row class="custom text-center" v-else>
      <v-btn rounded color="indigo" dark>Iniciar</v-btn>
      <v-btn rounded color="indigo" dark>Medio tiempo</v-btn>
      <v-btn rounded color="indigo" dark>Finalizar</v-btn>
      <v-btn rounded color="indigo" dark>Pausar</v-btn>
      <v-btn rounded color="indigo" dark ref="btnShow1" @click="gol()"
        >Goles</v-btn
      >
      <v-btn rounded color="indigo" dark ref="btnShow3" @click="tarjeta()"
        >Tarjeta</v-btn
      >
      <v-btn rounded color="indigo" dark ref="btnShow1" @click="cambio()"
        >Cambio</v-btn
      >
    </v-row>
    <v-col id="content" class="text-center">
      <v-card no-body align="center">
        <v-row>
          <v-col>
            <img
              :src="p.equipo1.equipo.logo"
              alt="logo1"
              width="100px"
              height="100px"
            />
            <p>{{ p.equipo1.equipo.nombre }}</p>
          </v-col>
          <v-col>
            <b-card-body title="Horario" v-if="false">
              <v-card-text title="Dia">{{ p.horario.dia }}</v-card-text>
              <v-card-text title="Hora">{{ p.horario.hora }}</v-card-text>
            </b-card-body>
            <b-card-body v-else>
              <v-card-text>
                <v-row class="h3" align="center" justify="center">
                  <span>{{gol1}}</span>
                  <v-spacer></v-spacer>
                  <span>-</span>
                  <v-spacer></v-spacer>
                  <span>{{gol2}}</span>
                </v-row></v-card-text
              >
            </b-card-body>
          </v-col>
          <v-col>
            <img
              :src="p.equipo2.equipo.logo"
              alt="logo1"
              width="100px"
              height="100px"
            />
            <p>{{ p.equipo2.equipo.nombre }}</p>
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
              <v-card v-for="l in lista" :key="l.minuto">
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
                        <span>{{gol1}}</span>
                        <v-spacer></v-spacer>
                        <span>-</span>
                        <v-spacer></v-spacer>
                        <span>{{gol2}}</span>
                      </v-row>
                    </v-row>
                  </v-row>
                  <v-spacer></v-spacer>
                  <span>{{ l.minuto }}</span>
                </v-card-title>

                <v-card-text v-if="l.titulo == 'cambio'" id="cambio">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-2" style=" color:dodgerblue;">
                        Entra
                      </div>
                      <v-list-item-title class="headline mb-1"
                        >Melvin recinos</v-list-item-title
                      >
                      <v-list-item-subtitle>Defensa</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-row align="center" justify="center">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/action-gol.appspot.com/o/jugadores%2F02.jpg?alt=media&token=c07f1387-57c4-44a0-957b-92fe28158497"
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
                      <v-list-item-title class="headline mb-1"
                        >Juan roldan</v-list-item-title
                      >
                      <v-list-item-subtitle>Defensa</v-list-item-subtitle>
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
                        >Pedro Romero</v-list-item-title
                      >
                      <v-list-item-subtitle
                        ><img
                          height="20px"
                          width="20px"
                          src="https://cdn2.iconfinder.com/data/icons/sports-colored-icons-vol-1-1/128/24-128.png"
                        />Jugada normal</v-list-item-subtitle
                      >
                    </v-list-item-content>
                    <v-row align="center" justify="center">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/action-gol.appspot.com/o/jugadores%2F02.jpg?alt=media&token=c07f1387-57c4-44a0-957b-92fe28158497"
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
                        >Pedro Romero</v-list-item-title
                      >
                    </v-list-item-content>
                    <v-row align="center" justify="center">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/action-gol.appspot.com/o/jugadores%2F02.jpg?alt=media&token=c07f1387-57c4-44a0-957b-92fe28158497"
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
          <div class="recuadro">
            <div class="equipo">
              <div class="marco">
                <div class="marco1"></div>
              </div>
              <div class="arco rotar arco1"></div>
              <v-row class="seccion por" align="center" justify="center" dense>
                <div>
                  <v-col>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/action-gol.appspot.com/o/jugadores%2F02.jpg?alt=media&token=c07f1387-57c4-44a0-957b-92fe28158497"
                      width="50px"
                      height="50px"
                      style="border-radius:25px;"
                    />
                  </v-col>
                  <span>Melvin</span>
                </div>
              </v-row>
              <v-row
                class="seccion def"
                align="center"
                justify="space-between"
                dense
              >
                <div v-for="n in 4" :key="n">
                  <v-col>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/action-gol.appspot.com/o/jugadores%2F02.jpg?alt=media&token=c07f1387-57c4-44a0-957b-92fe28158497"
                      width="50px"
                      height="50px"
                      style="border-radius:25px;"
                    />
                  </v-col>
                  <span>n</span>
                </div>
              </v-row>
              <v-row
                class="seccion cm"
                align="center"
                justify="space-around"
                dense
              >
                <div v-for="n in 4" :key="n">
                  <v-col>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/action-gol.appspot.com/o/jugadores%2F02.jpg?alt=media&token=c07f1387-57c4-44a0-957b-92fe28158497"
                      width="50px"
                      height="50px"
                      style="border-radius:25px;"
                    />
                  </v-col>
                  <span>n</span>
                </div>
              </v-row>
              <v-row
                class="seccion def"
                align="center"
                justify="space-around"
                dense
              >
                <div v-for="n in 2" :key="n">
                  <v-col>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/action-gol.appspot.com/o/jugadores%2F02.jpg?alt=media&token=c07f1387-57c4-44a0-957b-92fe28158497"
                      width="50px"
                      height="50px"
                      style="border-radius:25px;"
                    />
                  </v-col>
                  <span>n</span>
                </div>
              </v-row>
            </div>
            <div class="equipo equipo2">
              <div class="circulo rotar"></div>
              <div class="arco rotar arco2"></div>
              <div class="marco marco2">
                <div class="marco1 marco12"></div>
              </div>
              <v-row class="seccion del" justify="space-around" dense>
                <div v-for="n in 2" :key="n">
                  <v-col>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/action-gol.appspot.com/o/jugadores%2F02.jpg?alt=media&token=c07f1387-57c4-44a0-957b-92fe28158497"
                      width="50px"
                      height="50px"
                      style="border-radius:25px;"
                    />
                  </v-col>
                  <span>n</span>
                </div>
              </v-row>
              <v-row class="seccion" justify="space-around" dense>
                <div v-for="n in 4" :key="n">
                  <v-col>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/action-gol.appspot.com/o/jugadores%2F02.jpg?alt=media&token=c07f1387-57c4-44a0-957b-92fe28158497"
                      width="50px"
                      height="50px"
                      style="border-radius:25px;"
                    />
                  </v-col>
                  <span>n</span>
                </div>
              </v-row>
              <v-row class="seccion" justify="space-between" dense>
                <div v-for="n in 4" :key="n">
                  <v-col>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/action-gol.appspot.com/o/jugadores%2F02.jpg?alt=media&token=c07f1387-57c4-44a0-957b-92fe28158497"
                      width="50px"
                      height="50px"
                      style="border-radius:25px;"
                    />
                  </v-col>
                  <span>n</span>
                </div>
              </v-row>
              <v-row class="seccion" align="center" justify="center" dense>
                <div>
                  <v-col>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/action-gol.appspot.com/o/jugadores%2F02.jpg?alt=media&token=c07f1387-57c4-44a0-957b-92fe28158497"
                      width="50px"
                      height="50px"
                      style="border-radius:25px;"
                    />
                  </v-col>
                  <span>Melvin</span>
                </div>
              </v-row>
            </div>
          </div>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <v-card-text>
              esto nse
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
    <Gol :idpartido="idp"></Gol>
    <Cambio :idpartido="idp"></Cambio>
    <Formacion></Formacion>
  </v-container>
</template>
<script>
import Gol from "@/components/Gol";
import Cambio from "@/components/Cambio";
import Tarjeta from "@/components/Tarjeta";
import Formacion from "@/components/Formacion";
export default {
  components: {
    Gol,
    Cambio,
    Tarjeta,
    Formacion
  },
  computed:{
    gol1(){
      return this.p.golList.filter(x=>x.carnet.equipo.id==p.equipo1.id).length;
    },
    gol2(){
      return this.p.golList.filter(x=>x.carnet.equipo.id==p.equipo2.id).length;
    }
  },
  data() {
    return {
      idp: 0,
      p: {
        id: this.$route.params.id,
        formacionList: [],
        golList: [],
        equipo1: {
          equipo: {}
        },
        equipo2: {
          equipo: {}
        },
        horario: {},
        fecha: null,
        estado: true
      },
      letra: "cambio",
      lista: [
        {
          img:
            "https://cdn0.iconfinder.com/data/icons/football-35/64/whistle-referee-whistles-sound-256.png",
          titulo: "final del partido",
          minuto: "90+3"
        },
        {
          img:
            "https://cdn3.iconfinder.com/data/icons/arrows-218/128/arrows-19-256.png",
          titulo: "cambio",
          minuto: "56"
        },
        {
          img:
            "https://cdn1.iconfinder.com/data/icons/road-to-worldcup-filled-line/128/13_shot_goal_soccer_football_sport-256.png",
          titulo: "gol",
          minuto: "51"
        },
        {
          img:
            "https://cdn4.iconfinder.com/data/icons/football-element-1/64/yellow_card_card_amonestation_football_referee_rules_referee_football-128.png",
          titulo: "tarjeta amarilla",
          minuto: "60"
        },
        {
          img:
            "https://cdn4.iconfinder.com/data/icons/football-element-1/64/red_card_card_amonestation_football_referee_rules_referee_football-256.png",
          titulo: "tarjeta roja",
          minuto: "50"
        },
        {
          img:
            "https://cdn4.iconfinder.com/data/icons/football-soccer-sports-outline/512/yellow_red_card_foul_penalty_referee_competition-128.png",
          titulo: "doble amarilla",
          minuto: "40"
        },
        {
          img:
            "https://cdn2.iconfinder.com/data/icons/kick-off/450/Red-card-256.png",
          titulo: "roja y amarilla",
          minuto: "30"
        },
        {
          img:
            "https://cdn2.iconfinder.com/data/icons/american-football-15/64/referee-sports-competition-avatar-256.png",
          titulo: "inicio",
          minuto: "2"
        }
      ],
      tabs: null,
      hora: new Date().getHours() + ":" + new Date().getMinutes()
    };
  },
  methods: {
    async llenar() {
      await this.$axios
        .get(this.$path + "/partido/FindBy/" + this.p.id)
        .then(response => {
          this.p = response.data;
        })
        .catch(e => console.log(e));
    },
    gol() {
      this.idp = this.$route.params.id;
      this.$root.$emit("bv::show::modal", "modalGol", "#btnShow1");
    },
    cambio() {
      this.idp = this.$route.params.id;
      this.$root.$emit("bv::show::modal", "modalCambio", "#btnShow2");
    },
    formacion() {
      this.idp = this.$route.params.id;
      this.$root.$emit("bv::show::modal", "modalF", "#btnShow4");
    }
  },
  created() {
    this.llenar();
  }
};
</script>
<style>
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
  height: 21%;
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
  margin-top: -60%;
}
span {
  color: black;
}
.recuadro span {
  color: white;
}
</style>
