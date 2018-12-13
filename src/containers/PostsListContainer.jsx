// import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../redux/actions/posts';
import { getAuthenticated } from '../redux/selectors/auth';
import { getPostItems } from '../redux/selectors/posts';
import { getPostsUiLoading } from '../redux/selectors/ui';
import PostList from '../components/PostsList';

const mapStateToProps = state => ({
  authenticated: getAuthenticated(state),
  loading: getPostsUiLoading(state),
  items: getPostItems(state),
});

const mapDispatchToProps = { fetchPosts };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostList);
