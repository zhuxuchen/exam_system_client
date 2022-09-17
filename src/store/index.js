import { createStore } from 'vuex'

export default createStore({
  state: {
    // 练习模式
    isPractice: false,
  },
  getters: {
  },
  mutations: {
    practice(state, status){
      state.isPractice = status
    }
  },
  actions: {
    getPractice(context, status){
    context.commit('practice', status)
    }
  }
  ,
  modules: {
  }
})
