import PostsListView from 'views/PostsListView';
// import PostDetailContainer from 'containers/PostDetailContainer';
import PostDetailView from 'views/PostDetailView';

import PostsNewView from 'views/PostsNewView';
import PostsEditPageContainer from 'containers/PostsEditPageContainer';

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
        component: requireAuth(PostsEditPageContainer)
    },
    {
        path: '/posts/:postId',
        component: PostDetailView
    }
];

export default indexRoutes;
