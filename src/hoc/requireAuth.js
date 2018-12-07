import React from 'react';
import { connect } from 'react-redux';

export default WrappedComponent => {
    class ComposedComponent extends React.Component {
        componentDidMount() {
            this.shouldNavigateAway();
        }

        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway = () => {
            if (!this.props.authenticated) {
                this.props.history.push('/');
            }
        };

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    const mapStateToProps = state => ({
        authenticated: !!state.auth.user && !!state.auth.user.uid
    });

    return connect(mapStateToProps)(ComposedComponent);
};
