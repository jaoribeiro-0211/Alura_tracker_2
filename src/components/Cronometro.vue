<template>
  <section>
    <strong class="display">{{ tempoDecorrido }}</strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Cronometro",
  props: {
    tempoEmSegundo: {
      type: Number /* Tipo */,
      default: 0 /* Valor Padrão */,
    },
  },
  computed: {
    tempoDecorrido(): string {
      return new Date(this.tempoEmSegundo * 1000).toISOString().substr(11, 8);
    },
  },
});
</script>

<style>
.display {
  color: var(--texto-primario);
}
</style>