import PostsListView from 'views/PostsListView';
// import PostDetailContainer from 'containers/PostDetailContainer';
import PostDetailView from 'views/PostDetailView';

import PostsNewView from 'views/PostsNewView';
import PostsEditView from 'views/PostsEditView';

import requireAuth from '../hoc/requireAuth';

const indexRoutes = [
    {
        path: '/',
        component: PostsListView,
        exact: true
    },
    {
        path: '/posts/new',
        component: requireAuth(PostsNewView),
        exact: true,
    },
    {
        path: '/posts/edit/:postId',
        component: requireAuth(PostsEditView)
    },
    {
        path: '/posts/:postId',
        component: PostDetailView
    }
];

export default indexRoutes;
