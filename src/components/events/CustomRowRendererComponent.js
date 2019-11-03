import React, {Component} from 'react';
import { defaultTableRowRenderer } from 'react-virtualized';
import { DragSource } from 'react-dnd'

class CustomRowRendererComponent extends Component {

    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(defaultTableRowRenderer(this.props));
    };
}

const type = 'event';

const spec = {
    beginDrag(props) {
        return { id: props.rowData.id};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

export default DragSource(type, spec, collect)(CustomRowRendererComponent)
