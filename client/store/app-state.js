import {
  observable,
  // computed,
  action,
} from 'mobx'

import { post } from '../util/http'

export default class AppState {
  @observable user = {
    isLogin: false,
    info: {},
  }

  @action login(accessToken) {
    return new Promise((resolve, reject) => {
      post('/api/user/login', {}, {
        accessToken,
      }).then((res) => {
        if (res.success) {
          this.user.info = res.data
          this.user.isLogin = true
          resolve()
        } else {
          reject(res)
        }
      }).catch(reject)
    })
  }

  toJson() {
    return {
      user: this.user,
    }
  }
}
