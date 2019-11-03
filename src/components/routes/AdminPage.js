import React, {Component} from 'react';
import PeopleList from '../people/PeopleList';
import VirtualizedEventList from '../events/VirtualizedEventList';
import Bin from "../Bin";
import EventList from '../events/EventList'

const style = {
    display: 'flex',
    justifyContent: 'space-between'
};

class AdminPage extends Component {
    render() {
        return (
            <div>
                <h1>Admin page</h1>
                <PeopleList />
                <EventList />
                <div style={style}>
                    <VirtualizedEventList />
                    <Bin />
                </div>
            </div>
        );
    };
}

export default AdminPage;
