import {
  observable,
  action,
  extendObservable,
  toJS,
} from 'mobx'
import { topicSchema } from '../util/variable-define'
import { get } from '../util/http'

const createTopic = topic => Object.assign({}, topicSchema, topic)

class Topic {
  constructor(data) {
    extendObservable(this, data)
  }

  @observable loading = false
}

class TopicStore {
  @observable topics

  @observable loading

  constructor({ loading, topics } = { loading: false, topics: [] }) {
    this.loading = loading
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
  }

  pushTopic = (topic) => {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @action fetchTopics = () => {
    this.loading = true;
    this.topics = [];
    get('/topics', {
      mdrender: false, /** disable mark-down data format */
    }).then((res) => {
      if (res.success) {
        res.data.forEach(topic => this.pushTopic(topic))
      }
      this.loading = false
    })
  }

  toJson() {
    return {
      topics: toJS(this.topics),
      loading: toJS(this.loading),
    }
  }
}

export default TopicStore
