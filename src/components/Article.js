import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCommentVisibility, fetchAllArticles, articleAlterVotes } from '../actions/articleActions';
import { resetCommentState } from '../actions/commentActions';
import SingleArticle from '../statelessComponents/SingleArticle';
import { Redirect } from 'react-router';

class Articles extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }
    componentDidMount() {
        if (this.props.articles.articles[this.props.match.params.articleId] === undefined) {
            this.props.getArticles();
        } 
    }
    handleClick(event) {
        const articleId = event.target.value;
        this.props.commentVisibility(articleId);
        this.props.removeUnsavedComments();
    }
    render() {
        if ((/301/).test(this.props.error)) {
            return <Redirect to="/authentication" />;
        }
        return (
            <div className="article container">
                {this.props.articles.loading === false ? 
                   <SingleArticle key={this.props.articles.articles[this.props.match.params.articleId]._id}
                            handleClick={this.handleClick}
                            handleSubmit={this.props.adjustVote}
                            article={this.props.articles.articles[this.props.match.params.articleId]}
                            commentVisable={this.props.articles.articles[this.props.match.params.articleId].commentVisable} />
                    : <div className='container-fluid loader'></div>
                }
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        commentVisibility: (id) => {
            dispatch(changeCommentVisibility(id));
        },
        getArticles: (id) => {
            dispatch(fetchAllArticles(id));
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