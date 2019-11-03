import React, {Component} from 'react';
import { DropTarget } from 'react-dnd';
import {connect} from 'react-redux';
import {removeEven} from '../ducks/events'

class Bin extends Component {

    render() {
        const { connectDropTarget, canDrop, hovered} = this.props;


        const style = {
            width: '200px',
            height: '350px',
            border: `1px solid ${canDrop ? 'red' : 'black'}`,
            backgroundColor: hovered ? 'green' : 'white'
        };
        return connectDropTarget(
            <div>
                <h2>Bin</h2>
                <div style={style}></div>
            </div>
        );
    };
}

const spec = {
    drop(props, monitor) {
        const eventId = monitor.getItem().id;
        props.removeEven(eventId);
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType(),
        hovered: monitor.isOver(),
    }
}

export default connect(null, {removeEven})(DropTarget(['event'], spec, collect)(Bin));
