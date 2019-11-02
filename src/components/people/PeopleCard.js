import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import { addEventToPerson } from '../../ducks/people';


class PeopleCard extends Component {

    render() {
        const {person, style, isDragging, connectDragSource } = this.props;

        return connectDragSource(
            <div style={{width: 200, height: 100, ...style}}>
                {isDragging && ' (and I am being dragged now)'}
                <h3>{person.name} {person.lastName}</h3>
                <p>{person.email}</p>
            </div>
        );
    };
}

const spec = {
    beginDrag(props) {
        return {
            id: props.person.id
        }
    },

    endDrag(props, monitor) {
        const eventId = monitor.getDropResult().id;
        const personId = props.person.id;

        props.addEventToPerson(eventId, personId)
    }
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
});

export default connect(null, {addEventToPerson})(DragSource('person', spec, collect)(PeopleCard));
