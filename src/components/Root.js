import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import AdminPage from './routes/AdminPage';
import AuthPage from './routes/AuthPage';
import PeoplePage from './routes/PeoplePage';
import EventsPage from './routes/EventsPage';
import {connect} from 'react-redux';
import {moduleName, signOut} from '../ducks/auth';
import {NavLink} from 'react-router-dom'
import CustomDragLayer from './people/CustomDragLayer';

class Root extends Component {
    handleSignOut = () => {
        const {signOut} = this.props;
        signOut();
    };

    render() {
        const {signedIn} = this.props;
        const btn = signedIn
            ? <button onClick={this.handleSignOut}>sign out</button>
            : <NavLink to='/auth/signin'>sign in</NavLink>;

        return (
            <div>
                {btn}
                <ul>
                    <li><NavLink to='/admin'>admin</NavLink></li>
                    <li><NavLink to='/addPerson'>add person</NavLink></li>
                    <li><NavLink to='/events'>events</NavLink></li>
                </ul>
                <CustomDragLayer />
                <Route path='/admin' component={AdminPage} />
                <Route path='/auth' component={AuthPage} />
                <Route path='/addPerson' component={PeoplePage} />
                <Route path='/events' component={EventsPage} />
            </div>
        );
    };
}

export default connect(state => ({
    signedIn: !!state[moduleName].user
}), {signOut})(Root);
