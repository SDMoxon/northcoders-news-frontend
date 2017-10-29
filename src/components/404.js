import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Error extends Component {
    render() {
        return (
            <div className='container-fluid 404'>
                <h2>404</h2>
                <p>Don't Panic!</p>
                <NavLink to={'/'}>Click Here To Go Home</NavLink>
            </div>
        );
    }
}
export default Error;