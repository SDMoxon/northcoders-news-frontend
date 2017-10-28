import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchAllTopics} from '../actions/topicActions';


class Header extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <div className='container-fluid header'>
                <div className='row'>
                    <div className='col-sm-1'>Home</div>
                    {this.props.topics.map((topic) => {
                        return <div className='col-sm-1'>{topic}</div>;
                    })}
                </div>
            </div>
        );
    }
}

function mapDispatchToProps (dispatch) {
  return {
    getTopics: () => {
      dispatch(fetchAllTopics());
    }
  };
}

function mapStateToProps (state) {
  return {
    topics: state.topics,
    loading: state.topics.loading,
    error: state.topics.error
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);