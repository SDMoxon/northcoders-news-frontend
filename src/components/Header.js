import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllTopics } from '../actions/topicActions';
import { map } from 'underscore';
import '../styles/Header.css';

class Header extends Component {
    componentDidMount() {
        this.props.getTopics();
    }
    conditionalRender() {
        return this.props.topics.loading === false ? 
        <div className='navbar navbar-default'>
                <div id="navbar" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li><a className='navtext' href='/'>Home</a></li>
                        {map(this.props.topics.topics, (topic) => {
                            return <li key={topic._id}><NavLink className='navtext' to={`/topics/${topic.slug}/articles`} key={topic._id}>{topic.title}</NavLink></li>;
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