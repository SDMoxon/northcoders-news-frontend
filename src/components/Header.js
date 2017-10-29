import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllTopics } from '../actions/topicActions';
import { map } from 'underscore';

class Header extends Component {
    componentDidMount() {
        this.props.getTopics();
    }
    render() {
        return (
            <div className='container-fluid header'>
                <div className='row'>
                    <NavLink to='/' className='col-sm-1'>Home</NavLink>
                    {Object.keys(this.props.topics.topics).length ?
                        map(this.props.topics.topics, (topic) => {
                            return <NavLink to={`/articles/${topic.slug}`} key={topic._id} className='col-sm-1'>{topic.title}</NavLink>;


                        }) : 'Loading'
                    }
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTopics: () => {
            dispatch(fetchAllTopics());
        }
    };
}

function mapStateToProps(state) {
    return {
        topics: state.topics,
        loading: state.topics.loading,
        error: state.topics.error
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);