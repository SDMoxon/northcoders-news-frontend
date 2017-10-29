import React, { Component } from 'react';
import Comments from './Comments';
import { connect } from 'react-redux';
import { fetchAllArticles } from '../actions/articleActions';
import { map } from 'underscore';

class Articles extends Component {
    componentDidMount() {
        this.props.getArticles();
    }
    render() {
        return (
            <div className="articles container">

                {Object.keys(this.props.articles.articles).length ?
                    map(this.props.articles.articles, (article) => {
                        return (
                        <div key = {article._id}>
                        <div className='row' >{article.title}</div>
                        <Comments belongsTo={article._id}/>
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