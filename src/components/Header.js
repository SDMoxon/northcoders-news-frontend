import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllTopics } from '../actions/topicActions';
import '../styles/Header.css';

class Header extends Component {
    componentDidMount() {
        this.props.getTopics();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.login !== nextProps.login) {
            this.props.getTopics();
        }
    }
    render() {
        return this.props.login ?
            <div className='navbar navbar-default'>
                <div className="navbar-brand project-title col-sm-4"><p><i className="fa fa-newspaper-o news-icon" aria-hidden="true"></i>Northcoders News</p></div>
                <div id="navbar" className="collapse navbar-collapse">
                    <NavLink className='navtext fa fa-home fa-2x home-icon col-sm-4' to='/'></NavLink>
                    <ul className="nav navbar-nav pull-right">
                        {Object.keys(this.props.topics.topics).map((topic) => {
                            return <li key={topic}><NavLink className='navtext col-sm-1' to={`/topics/${this.props.topics.topics[topic].slug}/articles`} key={topic}>{this.props.topics.topics[topic].title}</NavLink></li>;
                        })}
                    </ul>
                </div>
            </div>
            :
            <div className='navbar navbar-default'>
                <div className="navbar-brand project-title col-sm-4"><p><i className="fa fa-newspaper-o news-icon" aria-hidden="true"></i>Northcoders News</p></div>
                <div id="navbar" className="collapse navbar-collapse">
                    <NavLink className='navtext fa fa-home fa-2x home-icon col-sm-4' to='/'></NavLink>
                </div>
            </div>;
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
        error: state.topics.error,
        login: state.login.authorised
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);