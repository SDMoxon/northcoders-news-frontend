import React, { Component } from 'react';
import Comments from './Comments';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchAllArticles, changeCommentVisibility, fetchSingleArticle, articleAlterVotes } from '../actions/articleActions';
import { resetCommentState } from '../actions/commentActions';
import { map } from 'underscore';

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
        if (Object.keys(this.props.articles.articles).length > 1) {
            return (
                <div className='row panel' key={article._id}>
                    <div className='panel-body'>
                        <NavLink to={`/articles/${article._id}`} >{article.title}</NavLink>
                        <p>{`${article.body.slice(0, 50)}...`}</p>
                        <form className="form-inline">
                        <p>{article.created_by}</p>
                            <p>Votes {article.votes}</p>
                            <button value={`up ${article._id}`} onClick={this.handleSubmit} className="btn btn-default pull-left" type="submit"> vote up</button>
                            <button value={`down ${article._id}`} onClick={this.handleSubmit} className="btn btn-default pull-left" type="submit"> vote down</button>
                        </form>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className='row ' key={article._id}>
                    <div className='panel panel'>
                        <div className='panel-body'>
                            <p>{article.title}</p>
                            <p>{article.body}</p>
                            <p>{article.created_by}</p>
                            <form className="form-inline">
                                <p>Votes {article.votes}</p>
                                <button value={`up ${article._id}`} onClick={this.handleSubmit} className="btn btn-default pull-left" type="submit"> vote up</button>
                                <button value={`down ${article._id}`} onClick={this.handleSubmit} className="btn btn-default pull-left" type="submit"> vote down</button>
                            </form>
                        </div>
                    </div>
                    {
                        this.props.articles.articles[article._id].commentVisable ?
                            <div>
                                <button className="btn btn-default" onClick={this.handleClick} value={article._id}>Hide Comments</button>
                                <Comments belongsTo={article._id} />
                            </div>
                            :
                            <button className="btn btn-default" onClick={this.handleClick} value={article._id}>Show Comments</button>
                    }
                </div>
            );
        }
    }
    render() {
        return (
            <div className="articles container">

                {this.props.articles.loading === false ?
                    map(this.props.articles.articles, (article) => {
                        return this.conditionalRender(article);
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