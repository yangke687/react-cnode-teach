import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopDetail from '../views/topic-detail/index'
import ApiTest from '../views/test/api-test'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key={1} />,
  <Route path="/list" component={TopicList} key={2} />,
  <Route path="/detail/:id" component={TopDetail} key={3} />,
  <Route path="/test" component={ApiTest} key={99} />,
]
