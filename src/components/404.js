import React, { Component, Link} from 'react';

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