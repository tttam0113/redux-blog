// import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../redux/actions/posts';
import PostList from '../components/PostsList';

const mapStateToProps = state => ({
    loading: state.ui.posts.loading,
    items: state.posts.items,
});

const mapDispatchToProps = { fetchPosts };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PostList);
