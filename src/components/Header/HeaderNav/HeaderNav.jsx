import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { history } from 'layouts/App';
import Avatar from '../User/Avatar';
import UserMenu from '../User/UserMenu';

// const items = [
//     {
//         label: 'Courses',
//         linkTo: '/'
//     },
//     {
//         label: 'Features',
//         linkTo: '/'
//     },
//     {
//         label: 'Review',
//         linkTo: '/'
//     },
//     {
//         label: 'Blog',
//         linkTo: '/'
//     }
// ];

// const HeaderNavItem = ({ linkTo, label }) => (
//     <div className="blog-header__nav-item">
//         <Link to={linkTo} className="btn btn--text">
//             {label}
//         </Link>
//     </div>
// );

class HeaderNav extends React.Component {
    state = {
        userMenuVisible: false,
    };

    setUserMenuVisible = (value) => {
        this.setState(() => ({ userMenuVisible: value }));
    };

    createNewPost = () => {
        history.push('/posts/new');
        this.setUserMenuVisible(false);
    };

    doLogout = () => {
        this.props.logout();
        this.setUserMenuVisible(false);
    };

    render() {
        const { login, user } = this.props;
        return (
            <div className="blog-header__nav">
                {!user ? (
                    <div className="blog-header__nav-item">
                        <button className="btn btn--secondary " onClick={login}>
                            Login
                        </button>
                    </div>
                ) : (
                    <div className="blog-header__nav-user">
                        <Avatar
                            avatar={user.photoURL}
                            displayName={user.displayName}
                            onClick={() => {
                                this.setUserMenuVisible(
                                    !this.state.userMenuVisible,
                                );
                            }}
                        />
                        {this.state.userMenuVisible ? (
                            <UserMenu
                                displayName={user.displayName}
                                createNewPost={this.createNewPost}
                                logout={this.doLogout}
                            />
                        ) : null}
                    </div>
                )}
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
