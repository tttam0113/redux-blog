import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { history } from 'layouts/App';
import Avatar from '../User/Avatar';
import UserMenu from '../User/UserMenu';

class HeaderNav extends React.Component {
  state = {
    userMenuVisible: false,
  };

  setUserMenuVisible = value => {
    this.setState(() => ({ userMenuVisible: value }));
  };

  createNewPost = () => {
    history.push('/posts/new');
    this.setUserMenuVisible(false);
  };

  handleLogout = () => {
    this.props.logout();
    this.setUserMenuVisible(false);
  };

  handleAvatarClick = () => this.setUserMenuVisible(!this.state.userMenuVisible);

  renderNavWithoutAuth = handleOnClick => {
    return (
      <div className="blog-header__nav-item">
        <button type="button" className="btn btn--secondary " onClick={handleOnClick}>
          Login
        </button>
      </div>
    );
  };

  toggleDisplayUserMenu = displayName => {
    return this.state.userMenuVisible ? (
      <UserMenu
        displayName={displayName}
        createNewPost={this.createNewPost}
        onLogout={this.handleLogout}
      />
    ) : null;
  };

  renderNavWithAuth = user => {
    const { photoURL, displayName } = user;

    return (
      <div className="blog-header__nav-user">
        <Avatar avatar={photoURL} displayName={displayName} onClick={this.handleAvatarClick} />
        {this.toggleDisplayUserMenu(displayName)}
      </div>
    );
  };

  render() {
    const { login: handleLogin, user } = this.props;
    return (
      <div className="blog-header__nav">
        {!user ? this.renderNavWithoutAuth(handleLogin) : this.renderNavWithAuth(user)}
      </div>
    );
  }
}

HeaderNav.propTypes = {
  login: PropTypes.func,
  logout: PropTypes.func,
  user: PropTypes.object,
};

export default HeaderNav;
