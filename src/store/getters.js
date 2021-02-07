import storage from '@/utils/storage'
import { USER_INFO, SYSTEM_INFO } from '@/store/mutation-types'
const getters = {
  token: state => state.user.token,
  avatar: state => { state.user.avatar = storage.get(USER_INFO).avatar; return state.user.avatar },
  username: state => state.user.username,
  nickname: state => { state.user.realname = storage.get(USER_INFO).realname; return state.user.realname },
  welcome: state => state.user.welcome,
  permissionList: state => state.user.permissionList,
  userInfo: state => { state.user.info = storage.get(USER_INFO); return state.user.info },
  systemInfo: state => { state.systemInfo = storage.get(SYSTEM_INFO); return state.systemInfo }
}

export default getters
