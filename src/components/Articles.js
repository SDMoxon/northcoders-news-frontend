import React, { Component } from 'react';
import Comments from './Comments';
import { connect } from 'react-redux';
import { fetchAllArticles, changeCommentVisability } from '../actions/articleActions';
import { map } from 'underscore';

class Articles extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        this.props.getArticles();
        console.log('*********',this);
    }
    handleClick(e) {
        console.log('8888888888',this);
        const articleId = e.target.value;
        this.props.commentVisability(articleId);
    }
    render() {
        return (
            <div className="articles container">

                {Object.keys(this.props.articles.articles).length ?
                    map(this.props.articles.articles, (article) => {
                        return (
                            <div key={article._id}>
                                <div className='row' >{article.title}</div>
                                {this.props.articles.articles[article._id].commentVisable ?
                                    <div>
                                        <button onClick={this.handleClick} value={article._id}>Hide Comments</button>
                                        <Comments belongsTo={article._id} />
                                    </div>
                                    :
                                    <button onClick={this.handleClick} value={article._id}>Show Comments</button>
                                }
                            </div>
                        );
                    }) : 'Loading'

                }
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getArticles: () => {
            dispatch(fetchAllArticles());
        },
        commentVisability: (id) => {
            dispatch(changeCommentVisability(id));
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