import React, {Component} from 'react';
import { DropTarget } from 'react-dnd';
import {connect} from 'react-redux';
import {personsGoingToEvent} from '../../ducks/events'


class EventCard extends Component {

    render() {
        const {selectedEvent, connectDropTarget, canDrop, hovered, people} = this.props;
        const personToEvent = people.map(person => <p key={person.id}>{person.email}</p>);

        const dropStyle = {
            border: `1px solid ${canDrop ? 'yellow' : 'black'}`,
            backgroundColor: hovered ? 'green' : 'white'
        };

        return connectDropTarget(
            <div style={{ ...dropStyle }}>
                <h3>{selectedEvent.title}</h3>
                <p>{selectedEvent.when}, {selectedEvent.where}</p>
                {personToEvent}
            </div>
        );
    };
}

const spec = {
    drop(props, monitor){
        const eventId = props.selectedEvent.id;
        const personId = monitor.getItem().id;
        return { id: eventId }
    },
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    hovered: monitor.isOver()
});

export default connect((state, props) => ({
    people: personsGoingToEvent(state, props.selectedEvent.id)
}))(DropTarget(['person'], spec, collect)(EventCard))
