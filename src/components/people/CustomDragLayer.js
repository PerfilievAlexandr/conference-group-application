import React, {Component} from 'react';
import {DragLayer} from 'react-dnd';
import PersonCardPreview from "./PersonCardPreview";

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
};

const previewMap = {
    person: PersonCardPreview
};

class CustomDragLayer extends Component {

    getItem() {
        const {currentOffset, item, itemType} = this.props;
        const PreviewComponent = previewMap[itemType];
        if (!currentOffset || !PreviewComponent) return null;
        const style = {
            transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`
        };

        return <div style={style}><PreviewComponent {...item}/></div>
    }

    render() {
        const { isDragging } = this.props;
        const item = this.getItem();

        if (!isDragging || !item) return null;
        return (
            <div style={layerStyles}>
                {item}
            </div>
        );
    };
}

function collect(monitor) {
    return {
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
        item: monitor.getItem(),
        itemType: monitor.getItemType(),

    }
}


export default DragLayer(collect)(CustomDragLayer)
