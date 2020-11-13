// import { login, logout, getInfo } from '@/api/login'
import { musicianLogin, companyLogin } from '@/api/login'
import { getToken, removeToken, setToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    userInfo: {},
    loginType: '' // 登录类型 musician:音乐人登录 company:公司登录
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_LOGINTYPE: (state, loginType) => {
      state.loginType = loginType
    }
  },

  actions: {
    // 公司用户登录
    CompanyLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        companyLogin(userInfo).then(res => {
          const data = res
          setToken(data.token)
          commit('SET_USERINFO', data.employeeInfo || {})
          commit('SET_TOKEN', data.token)
          commit('SET_LOGINTYPE', 'company')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 音乐人登录
    MusicianLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        musicianLogin(userInfo).then(res => {
          const data = res
          setToken(data.token)
          commit('SET_USERINFO', data.musicianInfo || {})
          commit('SET_TOKEN', data.token)
          commit('SET_LOGINTYPE', 'musician')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     resolve()
    //     getUserInfo().then(res => {
    //       commit('SET_USERINFO', res.data || {})
    //       resolve(res)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // 退出系统
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout().then(res => {
    //       commit('SET_USERINFO', {})
    //       commit('SET_TOKEN', [])
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USERINFO', {})
        commit('SET_TOKEN', [])
        commit('SET_LOGINTYPE', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
