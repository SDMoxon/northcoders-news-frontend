import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllTopics } from '../actions/topicActions';
import '../styles/Header.css';

class Header extends Component {
    componentDidMount() {
        this.props.getTopics();
    }
    conditionalRender() {
        return this.props.topics.loading === false ?
            <div className='navbar navbar-default'>
                <div className="navbar-brand project-title"><i className="fa fa-newspaper-o" aria-hidden="true"></i> Northcoders News</div>
                <div id="navbar" className="collapse navbar-collaps">
                    <ul className="nav navbar-nav pull-right">
                        <li><NavLink className='navtext fa fa-home fa-2x' to='/'></NavLink></li>
                        {Object.keys(this.props.topics.topics).map((topic) => {
                            return <li key={topic}><NavLink className='navtext' to={`/topics/${this.props.topics.topics[topic].slug}/articles`} key={topic}>{this.props.topics.topics[topic].title}</NavLink></li>;
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