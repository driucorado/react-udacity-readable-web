import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MainPage from './MainPage'
import CategoryPage from './CategoryPage'
import PostPage from './PostPage'
import PostAdd from './Post/PostAdd'
import LoginPage from './LoginPage'

/*
 * App Class (root router)
 */
class App extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="readable_app readable_v01">
            <Route  exact path="/login" render={({history}) => (
                <LoginPage/>
            )} />
            <Route  exact path="/" render={({history}) => (
                <MainPage/>
            )} />
            <Route path="/:cat" exact render={({match, history}) => (
                <CategoryPage match={match} />
            )} />
            <Route path="/cat/:cat/posts" exact render={({match, history}) => (
                <PostAdd match={match} />
            )} />
            <Route path="/:cat/:id" exact render={({match}) => (
                <PostPage match={match} />
            )} />
      </div>
    );
  }
}

export default App;
