import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import ApiTest from '../views/test/api-test'
import UserLogin from '../views/user/login'
import UserInfo from '../views/user/info'
import TopicCreate from '../views/topic-create/index'

export default () => [
  <Route path="/" exact render={() => <Redirect to="/list" />} key="first" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={TopicDetail} key="detail" />,
  <Route path="/user/login" exact key="user-login" component={UserLogin} />,
  <Route path="/user/info" exact component={UserInfo} />,
  <Route path="/test" component={ApiTest} key="test" />,
  <Route path="/topic/create" component={TopicCreate} key="create" />,
]
