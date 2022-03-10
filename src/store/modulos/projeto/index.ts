import http from '@/http'
import Iprojeto from '@/interfaces/Iprojeto'
import { Estado } from '@/store'
import {
  ALTERAR_PROJETO,
  CADASTRAR_PROJETO,
  OBTER_PROJETOS,
  REMOVER_PROJETO
} from '@/store/tipo-acoes'
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  DEFINIR_PROJETOS,
  EXCLUIR_PROJETO
} from '@/store/tipo-mutacoes'
import { Module } from 'vuex'

export interface EstadoProjeto {
  projetos: Iprojeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      } as Iprojeto
      state.projetos.push(projeto)
    },
    [ALTERA_PROJETO](state, projeto: Iprojeto) {
      const index = state.projetos.findIndex(proj => proj.id == projeto.id)
      state.projetos[index] = projeto
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter(proj => proj.id != id)
    },
    [DEFINIR_PROJETOS](state, projetos: Iprojeto[]) {
      state.projetos = projetos
    }
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http
        .get('projetos')
        .then(response => commit(DEFINIR_PROJETOS, response.data))
    },
    [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
      return http.post('/projetos', {
        nome: nomeDoProjeto
      })
    },
    [ALTERAR_PROJETO](contexto, projeto: Iprojeto) {
      return http.put(`/projetos/${projeto.id}`, projeto)
    },
    [REMOVER_PROJETO]({ commit }, id: string) {
      return http
        .delete(`/projetos/${id}`)
        .then(() => commit(EXCLUIR_PROJETO, id))
    }
  }
}
