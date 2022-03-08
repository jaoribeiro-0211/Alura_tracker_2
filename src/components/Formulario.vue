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
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { key } from "@/store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name: "Formulario",
  emits: ["aoSalvarTarefa"],
  data() {
    return {
      descricao: "",
      idIprojeto: "",
    };
  },
  components: { Temporizador },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      const projeto = this.projetos.find((proj) => proj.id == this.idIprojeto);
      if (!projeto) {
        this.store.commit(NOTIFICAR, {
          titulo: "Ops!",
          texto: "Selecione um projeto antes de salvar",
          tipo: TipoNotificacao.ATENCAO,
        });
        return;
      }

      this.$emit("aoSalvarTarefa", {
        descricao: this.descricao,
        duracaoEmSegundos: tempoDecorrido,
        projeto: this.projetos.find(
          (projeto) => projeto.id === this.idIprojeto
        ),
      });
      this.descricao = "";
    },
  },
  setup() {
    const store = useStore(key);
    return {
      store,
      projetos: computed(() => store.state.projetos),
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


