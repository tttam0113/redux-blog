import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Router, Redirect, Route, Switch,
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

// import Header from 'containers/HeaderContainer';
import Header from 'containers/HeaderContainer';
import Footer from 'components/Footer';
// import PrivateRoute from '../containers/PrivateRoute';
import indexRoutes from 'routes';
import { fetchUser } from '../redux/actions/auth';

export const history = createHistory();

class App extends React.Component {
    UNSAFE_componentWillMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <Router history={history}>
                <div className="blog-page-wrap">
                    <div className="blog-page-wrap__container">
                        <Header />
                        <Switch>
                            {indexRoutes.map((prop, key) => (prop.redirect ? (
                                <Redirect
                                    from={prop.path}
                                    to={prop.pathTo}
                                    key={key}
                                />
                            ) : (
                                <Route
                                    path={prop.path}
                                    component={prop.component}
                                    key={key}
                                    exact={prop.exact || false}
                                />
                            )))}
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

App.propTypes = {
    fetchUser: PropTypes.func.isRequired,
};

export default connect(
    null,
    { fetchUser },
)(App);
