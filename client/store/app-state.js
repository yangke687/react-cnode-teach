import {
  observable,
  // computed,
  action,
} from 'mobx'

import { post, get } from '../util/http'

export default class AppState {
  @observable user = {
    isLogin: false,
    info: {},
    detail: {
      recentTopics: [],
      recentReplies: [],
      syncing: false,
    },
    collections: {
      syncing: false,
      list: [],
    },
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

  @action getCollections() {
    this.user.collections.syncing = true
    const { loginname } = this.user.info
    return new Promise((resolve, reject) => {
      get(`/topic_collect/${loginname}`)
        .then((res) => {
          if (res.success) {
            this.user.collections.list = res.data
          } else {
            this.user.collections.syncing = false
            reject()
          }
        })
        .catch((err) => {
          this.user.collections.syncing = false
          reject(err)
        })
    })
  }

  @action getUserDetail() {
    this.user.detail.syncing = true
    const { loginname } = this.user.info
    return new Promise((resolve, reject) => {
      get(`/user/${loginname}`)
        .then((res) => {
          if (res.success) {
            this.user.detail.recentReplies = res.data.recent_replies
            this.user.detail.recentTopics = res.data.recent_topics
            resolve()
          } else {
            reject()
          }
          this.user.detail.syncing = false
        })
        .catch((err) => {
          this.user.detail.syncing = false
          reject(err)
        })
    })
  }

  toJson() {
    return {
      user: this.user,
    }
  }
}
