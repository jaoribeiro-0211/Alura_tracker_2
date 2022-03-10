<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjet"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import useNotificador from "@/hooks/notificador";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/store";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },
  /*   mounted() {
    if (this.id) {
      const projeto = this.store.state.projeto.projetos.find(
        (proj) => proj.id == this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
    }
  }, */
  /*   data() {
    return {
      nomeDoProjeto: "",
    };
  }, */
  methods: {
    /*  lidarComSucesso() {
      this.nomeDoProjeto = "";
      this.notificar(
        TipoNotificacao.SUCESSO,
        "Excelente!",
        "O projeto foi cadastrado com sucesso!"
      );
      this.$router.push("/projetos");
    }, */
  },
  /* Para receber props no CompositionAPI tem q passar props dentro do setup(props) */
  /* Para mexer com variaves reativa deve importa o ref */
  /* Para a variavel reativa receber algo tem q colocar o .value */
  /* Dentro do setup nao tem acesso ao this */
  /* UserRouter = da acesso ao roteador || VueRouter do vue */
  /* UserRoute = para ter acesso a rota atual,pegar os paramentros */
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notificar } = useNotificador();

    const nomeDoProjeto = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (proj) => proj.id == props.id
      );
      nomeDoProjeto.value = projeto?.nome || "";
    }
    const salvar = () => {
      if (props.id) {
        store
          .dispatch(ALTERAR_PROJETO, {
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => lidarComSucesso());
      } else {
        store
          .dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
          .then(() => lidarComSucesso());
      }
    };
    const lidarComSucesso = () => {
      nomeDoProjeto.value = "";
      notificar(
        TipoNotificacao.SUCESSO,
        "Excelente!",
        "O projeto foi cadastrado com sucesso!"
      );
      router.push("/projetos");
    };
    /* Retorna as funções ou variaveis que seram usadas fora do setup */
    return {
      salvar,
      /*  store,
      notificar, */
      nomeDoProjeto,
    };
  },
});
</script>
