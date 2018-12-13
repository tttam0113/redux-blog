import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
// import Header from 'containers/HeaderContainer';
import Header from 'containers/HeaderContainer';
import Footer from 'components/Footer';
// import PrivateRoute from '../containers/PrivateRoute';
import indexRoutes from 'routes';
import { fetchUser } from '../redux/actions/auth';

export const history = createHistory();

class App extends React.Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  renderRoute = prop => {
    const { name, path, pathTo, component, redirect = false, exact = false } = prop;
    return redirect ? (
      <Redirect from={path} to={pathTo} key={name} />
    ) : (
      <Route path={path} component={component} key={name} exact={exact} />
    );
  };

  switchRoutes = () => <Switch>{indexRoutes.map(this.renderRoute)}</Switch>;

  renderLayout = () => (
    <div className="blog-page-wrap">
      <div className="blog-page-wrap__container">
        <Header />
        {this.switchRoutes()}
      </div>
      <Footer />
    </div>
  );

  render() {
    return <Router history={history}>{this.renderLayout()}</Router>;
  }
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};

export default connect(
  null,
  { fetchUser },
)(App);
