import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topic-list/index'
import TopDetail from '../views/topic-detail/index'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key={1} />,
  <Route path="/list" component={TopicList} key={2} />,
  <Route path="/detail/:id" component={TopDetail} key={3} />,
]
