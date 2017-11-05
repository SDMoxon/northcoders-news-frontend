import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllArticles, changeCommentVisibility, fetchSingleArticle, articleAlterVotes } from '../actions/articleActions';
import { resetCommentState } from '../actions/commentActions';
import { map } from 'underscore';
import SingleArticle from '../containers/SingleArticle';
import ArticleList from '../containers/ArticleList';

class Articles extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.conditionalRender = this.conditionalRender.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleSubmit(event) {
        event.preventDefault();
        const eventValues = event.target.value.split(' ');

        const vote = eventValues[0];
        const id = eventValues[1];
        this.props.adjustVote(id, vote);
    }
    conditionalRender(article) {
        return Object.keys(this.props.articles.articles).length > 1 ?

            <ArticleList
                key={article._id}
                id={this.props.match.params.id}
                handleClick={this.handleClick}
                handleSubmit={this.handleSubmit}
                article={article} />
            :
            <SingleArticle key={article._id}
                handleClick={this.handleClick}
                handleSubmit={this.handleSubmit}
                article={article}
                commentVisable={this.props.articles.articles[article._id].commentVisable} />
    }
    render() {
        return (
            <div className="articles container">

                {this.props.articles.loading === false ?
                    map(this.props.articles.articles, (article) => {
                        return this.conditionalRender(article);
                    }) :  <div className='container-fluid loader'></div>
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