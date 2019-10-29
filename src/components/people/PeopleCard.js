import React, {Component} from 'react';
import { DragSource } from 'react-dnd';


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
    }
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
});

export default DragSource('person', spec, collect)(PeopleCard)
