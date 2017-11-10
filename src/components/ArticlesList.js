import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllArticles, articleAlterVotes } from '../actions/articleActions';
import ArticleList from '../statelessComponents/ArticleList';

class Articles extends Component {
    componentWillReceiveProps(nextProps) {
        const currentTopic = this.props.match.params.id;
        const nextTopic = nextProps.match.params.id;

        if (nextTopic !== currentTopic) {
            this.props.getArticles(nextProps.match.params.id);
        }
    }
    componentDidMount() {
            this.props.getArticles(this.props.match.params.id);
    }
    render() {
        return (
            <div className="articles-list container">

                {this.props.articles.loading === false ?
                    Object.keys(this.props.articles.articles).sort((a, b) => {
                        return this.props.articles.articles[b].votes - this.props.articles.articles[a].votes;
                    }).map((article) => {
                        return <ArticleList
                            key={article}
                            id={this.props.match.params.id}
                            handleSubmit={this.props.adjustVote}
                            article={this.props.articles.articles[article]} />;
                    }) : <div className='container-fluid loader'></div>
                }
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getArticles: (id) => {
            dispatch(fetchAllArticles(id));
        },
        adjustVote: (id, vote) => {
            dispatch(articleAlterVotes(id, vote));
        }
    };
}

function mapStateToProps(state) {
    return {
        articles: state.articles,
        loading: state.articles.loading,
        error: state.articles.error
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);