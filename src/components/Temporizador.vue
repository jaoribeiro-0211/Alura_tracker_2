<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundo="tempoEmSegundo" />
    <button class="button" @click="iniciar" :disabled="cronomentroRodando">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button class="button" @click="finalizar" :disabled="!cronomentroRodando">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";

export default defineComponent({
  name: "Temporizador",
  emits: ["aoTemporizadorFinalizado"],
  data() {
    return {
      tempoEmSegundo: 0,
      cronometro: 0,
      cronomentroRodando: false,
    };
  },
  methods: {
    iniciar() {
      this.cronomentroRodando = true;
      this.cronometro = setInterval(() => {
        this.tempoEmSegundo++;
      }, 1000);
    },
    finalizar() {
      this.cronomentroRodando = false;
      clearInterval(this.cronometro);
      this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundo);
      this.tempoEmSegundo = 0;
    },
  },
  components: { Cronometro },
});
</script>