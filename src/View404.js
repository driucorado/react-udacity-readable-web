import React, {Component} from 'react'
import MainLayout from './MainLayout'
import {Link} from 'react-router-dom'


class View404 extends Component {

    render() {
        return (
            <MainLayout mainClass={`category_v01`} title={
                <span><Link to={`/`}>Readable</Link>/NOT FOUND</span>
            }>
                <div>NOT FOUND</div>
            </MainLayout>)
    }

}

export default View404