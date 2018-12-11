import PostsListView from 'views/PostsListView';
// import PostDetailContainer from 'containers/PostDetailContainer';
import PostDetailView from 'views/PostDetailView';
import PostsNewView from 'views/PostsNewView';
import PostsEditView from 'views/PostsEditView';
import requireAuth from '../hoc/requireAuth';

const indexRoutes = [
  {
    name: 'PostsListView',
    path: '/',
    component: PostsListView,
    exact: true,
  },
  {
    name: 'PostsNewView',
    path: '/posts/new',
    component: requireAuth(PostsNewView),
    exact: true,
  },
  {
    name: 'PostsEditView',
    path: '/posts/edit/:postId',
    component: requireAuth(PostsEditView),
  },
  {
    name: 'PostDetailView',
    path: '/posts/:postId',
    component: PostDetailView,
  },
];

export default indexRoutes;
