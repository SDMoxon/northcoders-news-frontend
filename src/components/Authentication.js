import React, { Component } from 'react';

class Error extends Component {
    render() {
        return (
            <div className="container">
            
                <div className="jumbotron text-center">
                    <h1><span className="fa fa-lock"></span> Node Authentication</h1>
            
                    <p>Click below to login</p>
            
                    <a href="/login" className="btn btn-default"><span className="fa fa-user"></span> Login</a>
                </div>
            
            </div>
        );
    }
}
export default Error;