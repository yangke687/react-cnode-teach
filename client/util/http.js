import axios from 'axios'

const baseUrl = process.env.API_BASE || '';
/** 1. server side load 'http://127.0.0.1:3333/api/...'
 *  2. client side load 'http://localhost:8888/api/...'
 * */

const parseUrl = (url, params) => {
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&` // eslint-disable-line
    return result
  }, '')
  return `${url}?${str.substr(0, str.length - 1)}`
}

export const get = (url, params) => new Promise((resolve, reject) => {
  params = params || {} // eslint-disable-line
  axios(parseUrl(`${baseUrl}/api${url}`, params))
    .then((res) => {
      const { data } = res
      if (data && data.success) {
        resolve(data)
      } else {
        reject(data)
      }
    }).catch(reject)
})

export const post = (url, params, body) => new Promise((resolve, reject) => {
  axios.post(parseUrl(url, params), body)
    .then((res) => {
      const { data } = res
      if (data && data.success) {
        resolve(data)
      } else {
        reject(data)
      }
    }).catch(reject)
})

export default { get, post }
