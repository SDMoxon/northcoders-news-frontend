import React, { Component } from 'react';
import { Link } from 'react-router';
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
                    <div className='col-sm-1'>Home</div>
                    {Object.keys(this.props.topics.topics).length ?
                        map(this.props.topics.topics, (topic) => {
                            return <div className='col-sm-1'>{topic.title}</div>;


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