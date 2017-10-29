import React, { Component } from 'react';
import { Link } from 'react-router';
import { map } from 'underscore';

class Error extends Component {
    componentDidMount() {
        this.props.getTopics();
    }
    render() {
        return (
            <div className='container-fluid 404'>
                <p>Don't Panic!</p>
                <Link to={'/'}/>
            </div>
        );
    }
}
export default Error;