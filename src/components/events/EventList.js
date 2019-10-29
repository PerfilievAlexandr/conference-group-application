import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectedEventsSelector} from '../../ducks/events';
import EventCard from './EventCard';

class EventList extends Component {

    render() {
        const {events} = this.props;

        return (
           <div>
               {events.map(selectedEvent => <EventCard selectedEvent={selectedEvent} key={selectedEvent.id}/>)}
           </div>
        );
    };
}

export default connect(state => ({
    events: selectedEventsSelector(state)
}))(EventList)
