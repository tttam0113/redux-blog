import React from 'react';
import { connect } from 'react-redux';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

// import Header from 'containers/HeaderContainer';
import Header from 'containers/HeaderContainer';
import Footer from 'components/Footer';
// import PrivateRoute from '../containers/PrivateRoute';
import { fetchUser } from '../redux/actions/auth';
import indexRoutes from 'routes';

export const history = createHistory();

class App extends React.Component {
    componentWillMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <Router history={history}>
                <div className="blog-page-wrap">
                    <div className="blog-page-wrap__container">
                        <Header />
                        <Switch>
                            {indexRoutes.map((prop, key) => {
                                return prop.redirect ? (
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
                                );
                            })}
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default connect(
    null,
    { fetchUser }
)(App);
