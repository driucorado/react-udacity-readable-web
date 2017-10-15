import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import MainPage from './MainPage'
import CategoryPage from './CategoryPage'
import PostPage from './PostPage'
import PostAddForm from './PostAddForm'
import LoginPage from './LoginPage'
import View404 from "./View404";

/*
 * App Class (root router)
 */
class App extends Component {
    render() {
        return (
            <div className="readable_app readable_v01">
                <Route exact path="/login" render={({history}) => (
                    <LoginPage/>
                )}/>
                <Route path="/posts/post/new" exact render={({match, history}) => (
                    <PostAddForm match={match}/>
                )}/>
                <Route exact path="/" render={({history}) => (
                    <MainPage/>
                )}/>
                <Route path='/404' exact={true} component={View404}/>
                <Route path="/:cat" exact render={({match, history}) => (
                    <CategoryPage match={match}/>
                )}/>
                <Route path="/:cat/:id/edit" exact render={({match, history}) => (
                    <PostAddForm match={match}/>
                )}/>
                <Route path="/:cat/:id" exact render={({match}) => (
                    <PostPage match={match}/>
                )}/>

            </div>
        );
    }
}

export default App;
