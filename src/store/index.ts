import Iprojeto from '../interfaces/Iprojeto'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  EXCLUIR_PROJETO,
  NOTIFICAR
} from './tipo-mutacoes'
import { INotificacao } from '@/interfaces/INotificacao'
interface Estado {
  projetos: Iprojeto[]
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: []
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      } as Iprojeto
      state.projetos.push(projeto)
    },
    [ALTERA_PROJETO](state, projeto: Iprojeto) {
      const index = state.projetos.findIndex(proj => proj.id === projeto.id)
      state.projetos[index] = projeto
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter(proj => proj.id !== id)
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          notificacao => notificacao.id !== novaNotificacao.id
        )
      }, 3000)
    }
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}
