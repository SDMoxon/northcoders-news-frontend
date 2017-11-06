import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllArticles, changeCommentVisibility, fetchSingleArticle, articleAlterVotes } from '../actions/articleActions';
import { resetCommentState } from '../actions/commentActions';
import SingleArticle from '../containers/SingleArticle';
import ArticleList from '../containers/ArticleList';

class Articles extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.conditionalRender = this.conditionalRender.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const currentTopic = this.props.match.params.id;
        const nextTopic = nextProps.match.params.id;

        if (nextProps.match.params.articleId !== this.props.match.params.articleId &&
            nextProps.match.params.articleId !== undefined) {
            this.props.getArticle(nextProps.match.params.articleId);
        }
        else if (nextTopic !== currentTopic) {
            this.props.getArticles(nextProps.match.params.id);
        }
    }
    componentDidMount() {
        if (this.props.match.path === '/articles/:articleId') {
            this.props.getArticle(this.props.match.params.articleId);
        }
        else {
            this.props.getArticles(this.props.match.params.id);
        }
    }
    handleClick(event) {
        const articleId = event.target.value;
        this.props.commentVisibility(articleId);
        this.props.removeUnsavedComments();
    }
    conditionalRender(article) {
        return Object.keys(this.props.articles.articles).length > 1 ?

            <ArticleList
                key={article._id}
                id={this.props.match.params.id}
                handleClick={this.handleClick}
                handleSubmit={this.props.adjustVote}
                article={article} />
            :
            <SingleArticle key={article._id}
                handleClick={this.handleClick}
                handleSubmit={this.props.adjustVote}
                article={article}
                commentVisable={this.props.articles.articles[article._id].commentVisable} />;
    }
    render() {
        return (
            <div className="articles container">

                {this.props.articles.loading === false ?
                    Object.keys(this.props.articles.articles).sort((a, b) => {
                        return this.props.articles.articles[b].votes - this.props.articles.articles[a].votes;
                    }).map((article) => {
                        return this.conditionalRender(this.props.articles.articles[article]);
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
        commentVisibility: (id) => {
            dispatch(changeCommentVisibility(id));
        },
        getArticle: (articleId) => {
            dispatch(fetchSingleArticle(articleId));
        },
        removeUnsavedComments: () => {
            dispatch(resetCommentState());
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