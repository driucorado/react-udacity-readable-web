import React, {Component} from 'react'
import MainLayout from './MainLayout'
import {Link} from 'react-router-dom'


class View404 extends Component {
    componentDidMount() {

    }

    render() {
        const {posts, title, user, postList, openPostEdition} = this.props
        return (
            <MainLayout currentUser={user} mainClass={`category_v01`} title={
                <span><Link to={`/`}>Readable</Link>/{title}</span>
            }>
                <div>NOT FOUND</div>
            </MainLayout>)
    }

}

export default View404