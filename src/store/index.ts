import http from '@/http'
import { INotificacao } from '@/interfaces/INotificacao'
import ITarefa from '@/interfaces/ITarefa'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { EstadoProjeto, projeto } from './modulos/projeto'
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from './tipo-acoes'
import {
  ADICIONA_TAREFA,
  ALTERA_TAREFA,
  DEFINIR_TAREFAS,
  NOTIFICAR
} from './tipo-mutacoes'

export interface Estado {
  notificacoes: INotificacao[]
  tarefas: ITarefa[]
  projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()
export const store = createStore<Estado>({
  state: {
    notificacoes: [],
    tarefas: [],
    projeto: {
      projetos: []
    }
  },
  mutations: {
    /* Tarefas */
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(t => t.id == tarefa.id)
      state.tarefas[index] = tarefa
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          notificacao => notificacao.id != novaNotificacao.id
        )
      }, 3000)
    }
  },
  actions: {
    /* Tarefas */
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = 'tarefas'

      if (filtro) {
        url += '?descricao=' + filtro
      }
      http.get(url).then(response => commit(DEFINIR_TAREFAS, response.data))
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .post('/tarefas', tarefa)
        .then(response => commit(ADICIONA_TAREFA, response.data))
    },

    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .put(`/tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa))
    }
  },
  modules: {
    projeto
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}
