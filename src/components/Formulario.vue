import { key } from "@/store";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Temporizador from "./Temporizador.vue";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { key } from "@/store";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Temporizador from "./Temporizador.vue";
import { key } from "@/store";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Temporizador from "./Temporizador.vue";
<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para iniciar uma nova tarefa"
      >
        <input
          class="input"
          type="text"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idIprojeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name: "Formulario",
  emits: ["aoSalvarTarefa"],

  components: { Temporizador },

  setup(props, { emit }) {
    const store = useStore(key);
    const descricao = ref("");
    const idIprojeto = ref("");

    const projetos = computed(() => store.state.projeto.projetos);

    const finalizarTarefa = (tempoDecorrido: number): void => {
      /*  const projeto = projetos.value.find(
        (proj) => proj.id == idIprojeto.value
      );
      if (!projeto) {
        store.commit([NOTIFICAR], {
          titulo: "Ops!",
          texto: "Selecione um projeto antes de salvar",
          tipo: TipoNotificacao.ATENCAO,
        });
        return;
      } */

      emit("aoSalvarTarefa", {
        descricao: descricao.value,
        duracaoEmSegundos: tempoDecorrido,
        projeto: projetos.value.find(
          (projeto) => projeto.id === idIprojeto.value
        ),
      });
      descricao.value = "";
    };

    return {
      finalizarTarefa,
      descricao,
      idIprojeto,
      store,
      projetos,
    };
  },
});
</script>

<style >
.formulario {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>



