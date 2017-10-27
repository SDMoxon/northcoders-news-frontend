import React, { Component } from 'react';


const topics = ['football', 'cats', 'gregory'];
class Header extends Component {
    render() {
        return (
            <div className='container-fluid header'>
                <div className='row'>
                <div className='col-sm-1'>Home</div>
                    {topics.map((topic) => {
                        return <div className='col-sm-1'>{topic}</div>;
                    })}
                </div>
            </div>
        );
    }
}

export default Header;