import React, {Component} from 'react';
import { DropTarget } from 'react-dnd'


class EventCard extends Component {

    render() {
        const {selectedEvent, style, connectDropTarget, canDrop, hovered} = this.props;

        const dropStyle = {
            border: `1px solid ${canDrop ? 'yellow' : 'black'}`,
            backgroundColor: hovered ? 'green' : 'white'
        };

        return connectDropTarget(
            <div style={{width: 200, height: 100, ...style, ...dropStyle}}>
                <h3>{selectedEvent.title}</h3>
                <p>{selectedEvent.when}, {selectedEvent.where}</p>
            </div>
        );
    };
}

const spec = {
    drop(props, monitor){
        const event = props.selectedEvent.id;
        const person = monitor.getItem().id;
        console.log('test', event, person);
    },
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    hovered: monitor.isOver()
});

export default DropTarget(['person'], spec, collect)(EventCard)
