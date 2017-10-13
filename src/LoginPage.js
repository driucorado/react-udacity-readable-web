import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import MainLayout from './MainLayout'
import {connect} from 'react-redux'
import {changeUserName, loginUser} from './Login/actions'
import './style/css/Login/style/login.css';


class LoginPage extends Component {
    componentDidMount() {
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {newUser, registerUser} = this.props
        console.log('enter system')
        console.log(newUser)
        registerUser(newUser)
    }

    render() {
        const {user, changeUserName, newUser} = this.props
        if (user !== '') {
            return (<Redirect to="/"/>)
        } else
            return (
                <MainLayout title="Readable" mainClass="login_v01" showTitle={true}>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                                <form className="form-signin" onSubmit={(e) => this.handleSubmit(e)}>
                                    <div className="form-group">
                                        <input className="form-control" value={newUser}
                                               onChange={(e) => changeUserName(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">Enter to Readable</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </MainLayout>)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        registerUser: (userName) => dispatch(loginUser(userName)),
        changeUserName: (userName) => dispatch(changeUserName(userName))
    }
}

const mapStateToProps = ({user}) => {
    return {user: user.user, newUser: user.newUser}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)