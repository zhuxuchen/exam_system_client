import { createStore } from 'vuex'

export default createStore({
  state: {
    // 练习模式
    isPractice: false,
    // 菜单栏左右滑动标志
    flag: false,
    menu: [
      {
        index: '1',
        title: '考试管理',
        icon: 'icon-kechengbiao',
        content: [
          { item1: '功能介绍', path: '/examdescription' },
          { item2:'考试查询',path:'selectexam' },
          { tem3:'添加考试',path:'/addExam' }
        ]
      },
      {
        
      }
    ]
  },
  getters: {
  },
  mutations: {
    practice(state, status) {
      state.isPractice = status
    },
    toggle(state) {
      state.flag = !state.flag
    }
  },
  actions: {
    getPractice(context, status) {
    context.commit('practice', status)
    }
  }
  ,
  modules: {
  }
})
