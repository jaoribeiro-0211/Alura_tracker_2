import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: () => import('../views/Tarefas.vue')
  },
  {
    path: '/projetos',
    component: () => import('../views/Projetos.vue'),
    children: [
      {
        path: '',
        name: 'Projetos',
        component: () => import('../views/Projetos/Lista.vue')
      },
      {
        path: 'novo',
        name: 'Novo projetos',
        component: () => import('../views/Projetos/Formulario.vue')
      },
      {
        path: ':id',
        name: 'Editar Projeto',
        component: () => import('../views/Projetos/Formulario.vue'),
        props: true
      }
    ]
  }
]

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas
})

export default roteador
