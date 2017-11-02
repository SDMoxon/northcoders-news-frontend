import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllTopics } from '../actions/topicActions';
import { map } from 'underscore';

class Header extends Component {
    componentDidMount() {
        this.props.getTopics();
    }
    conditionalRender() {
        return this.props.topics.loading === false ? 
        <div className='header navbar navbar-default'>
                <div id="navbar" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li><a href='/'>Home</a></li>
                        {map(this.props.topics.topics, (topic) => {
                            return <li><NavLink to={`/topics/${topic.slug}/articles`} key={topic._id}>{topic.title}</NavLink></li>;
                        })}
                    </ul>
                </div>
        </div>
        :
        <div></div>;
    }
    render() {
        return (
            this.conditionalRender()
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