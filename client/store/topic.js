import {
  observable,
  computed,
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

  @observable details

  constructor({ loading, topics, details } = { loading: false, topics: [], details: [] }) {
    this.loading = loading
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details.map(d => new Topic(createTopic(d)))
  }

  @computed get detailsMap() {
    return this.details.reduce((results, detail) => {
      results[detail.id] = detail // eslint-disable-line
      return results
    }, {})
  }

  pushTopic = (topic) => {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @action fetchTopics = (tab) => {
    this.loading = true;
    this.topics = [];
    get('/topics', {
      mdrender: false, /** disable mark-down data format */
      tab: tab, // eslint-disable-line
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

  @action getTopicDetail(id) {
    return new Promise((resolve, reject) => {
      if (this.detailsMap[id]) {
        resolve(this.detailsMap[id])
      } else {
        get(`/topic/${id}`, {
          mdrender: false,
        })
          .then((res) => {
            if (res.success) {
              const topic = new Topic(createTopic(res.data))
              this.details.push(topic)
              resolve(topic)
            } else {
              reject()
            }
          })
          .catch(reject)
      }
    })
  }
}

export default TopicStore
