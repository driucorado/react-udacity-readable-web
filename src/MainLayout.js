import React, {Component} from 'react';
import Header from './Header';
import {connect} from 'react-redux'

class MainLayout extends Component {

    render() {
        const {title, children, mainClass, currentUser} = this.props
        return (<div className={`${mainClass} main`}>
            <Header title={title} user={currentUser}/>
            <div>{children}</div>
        </div>)
    }
}

const mapStateToProps = ({user}) => {
    return {user: user.user}
}

export default connect(mapStateToProps)(MainLayout)