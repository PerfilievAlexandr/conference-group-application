import React, {Component} from 'react';
import PeopleList from '../people/PeopleList';

class AdminPage extends Component {
    render() {
        return (
            <div>
                <h1>Admin page</h1>
                <PeopleList />
            </div>
        );
    };
}

export default AdminPage;
