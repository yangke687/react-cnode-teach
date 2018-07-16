import AppState from './app-state'
import TopicStore from './topic'

export default {
  AppState,
  TopicStore,
}

export const createStoreMap = () => ({
  appState: new AppState(),
  topicStore: new TopicStore(),
})
