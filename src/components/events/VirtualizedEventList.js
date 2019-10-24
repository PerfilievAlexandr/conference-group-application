import React, {Component} from 'react';
import {connect} from 'react-redux';
import {moduleName, eventListSelector} from '../../ducks/events';
import {loadEvents, selectEvent} from '../../ducks/events';
import Loader from "../Loader";
import {Table, Column} from 'react-virtualized';
import 'react-virtualized/styles.css';

export class EventsList extends Component {

    componentDidMount() {
        this.props.loadEvents();
    };

    handleEventClick = (id) => {
        this.props.selectEvent(id)
    };

    getRows = () => {
        const {events, loaded} = this.props;

        return loaded && events.map(row => {
            return (
                <tr key={row.id} onClick={() => this.handleEventClick(row.id)}>
                    <td>{row.title}</td>
                    <td>{row.where}</td>
                    <td>{row.month}</td>
                </tr>
            )
        })
    };

    rowGetter = ({index}) => this.props.events[index];

    render() {
        const {events, loaded} = this.props;
        if (!loaded) return <Loader/>;
        return (
                <Table
                    headerHeight={50}
                    height={400}
                    rowCount={events.length}
                    rowGetter={this.rowGetter}
                    rowHeight={30}
                    width={700}
                >
                    <Column
                        dataKey='title'
                        label='title'
                        width={300}
                    />
                    <Column
                        dataKey='where'
                        label='where'
                        width={250}
                    />
                    <Column
                        dataKey='when'
                        label='when'
                        width={150}
                    />
                </Table>
        );
    };
}

export default connect((state) => ({
    events: eventListSelector(state),
    loaded: state[moduleName].loaded,
}), {loadEvents, selectEvent})(EventsList);
