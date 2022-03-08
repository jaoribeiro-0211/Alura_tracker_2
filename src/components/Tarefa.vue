<template>
  <Box>
    <div class="columns">
      <div class="column is-4">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || "Sem projeto" }}
      </div>
      <div class="column">
        <Cronometro :tempoEmSegundo="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import ITarefa from "@/interfaces/ITarefa";
import { defineComponent, PropType } from "vue";
import Cronometro from "./Cronometro.vue";
import Box from "./Box.vue";

export default defineComponent({
  name: "Tarefa",
  components: { Cronometro, Box },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      /* Não Existe uma tarefa sem esse paramentro */
      required: true,
    },
  },
});
</script>

<style scoped>
</style>
