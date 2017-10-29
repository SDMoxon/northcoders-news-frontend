import React, { Component } from 'react';
import Comments from './Comments';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchAllArticles, changeCommentVisability, fetchSingleArticle } from '../actions/articleActions';
import { map } from 'underscore';

class Articles extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.conditionalRender = this.conditionalRender.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.articleId !== this.props.match.params.articleId && nextProps.match.params.articleId !== undefined) {
            this.props.getArticle(nextProps.match.params.articleId);
        }
        else {
            const currentTopic = this.props.match.params.id;
            const nextTopic = nextProps.match.params.id;
            if (nextTopic !== currentTopic) {
                this.props.getArticles(nextProps.match.params.id);
            }
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
        this.props.commentVisability(articleId);
    }
    conditionalRender(article) {
        if (Object.keys(this.props.articles.articles).length > 1) {
            return (
                <div key={article._id}>
                    <NavLink to={`/articles/${article._id}`} className='row' >{article.title}</NavLink>
                </div>
            );
        }
        else {
            return (
                <div key={article._id}>
                    <div className='row' >{article.title}</div>
                    {
                        this.props.articles.articles[article._id].commentVisable ?
                            <div>
                                <button onClick={this.handleClick} value={article._id}>Hide Comments</button>
                                <Comments belongsTo={article._id} />
                            </div>
                            :
                            <button onClick={this.handleClick} value={article._id}>Show Comments</button>
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
        commentVisability: (id) => {
            dispatch(changeCommentVisability(id));
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