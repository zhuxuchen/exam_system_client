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
          { item1: '功能介绍', path: '/examDescription' },
          { item2:'考试查询',path:'selectExam' },
          { tem3:'添加考试',path:'/addExam' }
        ]
      },
      {
        index: '2',
        title: '题库管理',
        icon: 'icon-tiku',
        content: [
          { item1:'功能介绍',path:'/answerDescription' },
          { item2:'所有题库',path:'/selectAnswer' },
          { item3:'增加题库',path:'/addAnswer' },
          { path: '/addAnswerChildren' }
        ]
      },
      {
        index: '3',
        title: '成绩查询',
        icon: 'icon-performance',
        content: [
          { item1:'学生成绩查询',path:'/allStudentsGrade' },
          { path: '/grade' },
          { item2: '成绩分段查询',path: '/selectExamToPart' },
          { path: '/scorePart' }
        ]
      },
      {
        index: '4',
        title: '成绩管理',
        icon: 'icon-role',
        content: [
          { item1:'学生管理',path:'/studentManage' },
          { item2: '添加学生',path: '/addStudent' }
        ]
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
