import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import {withRouter} from  'react-router'
import MainPage from './MainPage'
import CategoryPage from './CategoryPage'
import PostPage from './PostPage'
import {connect} from 'react-redux'

class App extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="readable_app readable_v01">
            <Route  exact path="/" render={({history}) => (
                <MainPage/>
            )} />
            <Route path="/cat/:cat" exact render={({match, history}) =>{
                console.log(match)
                return <CategoryPage match={match} />
            }} />
            <Route path="/cat/:cat/post/:post" exact render={({params, history}) => (
                <PostPage match={params.match} />
            )}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

function  mapStateToProps({main}) {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
