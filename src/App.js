import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MainPage from './MainPage'

class App extends Component {
  render() {
    return (
      <div className="readable_app readable_v01">
            <Route  exact path="/" render={() => (
                <MainPage/>
            )} />
            <Route exact path="/search" render={() => (
                <div>search</div>
            )} />
            <Route path="/cat" render={() => (
                <div>detail</div>
            )} />
            <Route path="/post" render={() => (
                <div>post</div>
            )} />
      </div>
    );
  }
}

export default App;
