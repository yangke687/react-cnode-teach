import {
  observable,
  computed,
  action,
  autorun,
} from 'mobx'

export class AppState {
  @observable count = 0

  @observable name = 'Ke Yang'

  @computed get msg() {
    return `${this.name} said: ${this.count}`
  }

  @action add() {
    this.count += 1
  }

  @action changeName(name) {
    this.name = name
  }
}

const appState = new AppState()
autorun(() => {
  // console.log(appState.msg) // eslint-disable-line
})

setInterval(() => {
  appState.add()
}, 1000)

export default appState
