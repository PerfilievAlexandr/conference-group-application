import React, {Component} from 'react';
import PeopleList from '../people/PeopleList';
import VirtualizedEventList from '../events/VirtualizedEventList';
import EventList from '../events/EventList'

class AdminPage extends Component {
    render() {
        return (
            <div>
                <h1>Admin page</h1>
                <PeopleList />
                <EventList />
                <VirtualizedEventList />
            </div>
        );
    };
}

export default AdminPage;
