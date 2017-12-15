import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/loginActions';
import { NavLink, Redirect } from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: ''
            }
        };
        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }
    processForm(event) {
        event.preventDefault();
        this.props.loginRequest(this.state.user);
    }
    changeUser(event) {
        event.preventDefault();
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }
    render() {  
        if (this.props.login.authorised) {
            return <Redirect to='/' />;
        }
        return (
            <div className="container">

                <div className="col-sm-6 col-sm-offset-3">

                    <h1><span className="fa fa-sign-in"></span> Login</h1>
                    {this.props.loginError ? <div className="alert alert-danger"><p>Incorrect username or password</p></div> : <div></div>}
                    {/* LOGIN FORM */}
                    <form onSubmit={this.processForm}>
                        <div className="form-group">
                            <label>User Name</label>
                            <input onChange={this.changeUser} type="text" className="form-control" name="username" value={this.state.user.username} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input onChange={this.changeUser} type="password" className="form-control" name="password" value={this.state.user.password} />
                        </div>

                        <button type="submit" className="btn btn-warning btn-lg">Login</button>
                    </form>
                    {/* <p>Need an account? <NavLink to="/signup">Signup</NavLink></p> */}
                </div>

            </div>

        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        loginRequest: (user) => {
            dispatch(loginRequest(user));

        }
    }
}
function mapStateToProps(state) {
    return {
        login: state.login,
        activeUser: state.login.user,
        loginError: state.login.error
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
