const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  loginType: state => state.user.loginType
}
export default getters
