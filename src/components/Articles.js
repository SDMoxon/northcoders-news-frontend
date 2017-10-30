import React, { Component } from 'react';
import Comments from './Comments';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchAllArticles, changeCommentVisibility, fetchSingleArticle } from '../actions/articleActions';
import { map } from 'underscore';

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
    handleClick(e) {
        const articleId = e.target.value;
        this.props.commentVisibility(articleId);
    }
    conditionalRender(article) {
        if (Object.keys(this.props.articles.articles).length > 1) {
            return (
                <div className='row' key={article._id}>
                    <NavLink to={`/articles/${article._id}`} >{article.title}</NavLink>
                    <p>{article.body}</p>
                </div>
            );
        }
        else {
            return (
                <div className='row' key={article._id}>
                    <p>{article.title}</p>
                    <p>{article.body}</p>
                    {
                        this.props.articles.articles[article._id].commentVisable ?
                            <div>
                                <button class="btn" onClick={this.handleClick} value={article._id}>Hide Comments</button>
                                <Comments belongsTo={article._id} />
                            </div>
                            :
                            <button class="btn" onClick={this.handleClick} value={article._id}>Show Comments</button>
                    }
                </div>
            );
        }
    }
    render() {
        return (
            <div className="articles container">

                {Object.keys(this.props.articles.articles).length ?
                    map(this.props.articles.articles, (article) => {
                        return this.conditionalRender(article)
                    }) : 'Loading'

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