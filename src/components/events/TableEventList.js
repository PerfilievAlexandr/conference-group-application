import React, {Component} from 'react';
import {connect} from 'react-redux';
import {moduleName, eventListSelector} from '../../ducks/events';
import {loadEvents, selectEvent} from '../../ducks/events';
import Loader from "../Loader";

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

    render() {
        if (this.props.loading) return <Loader/>;
        return (
            <table>
                <tbody>
                    {this.getRows()}
                </tbody>
            </table>
        );
    };
}

export default connect((state) => ({
    events: eventListSelector(state),
    loading: state[moduleName].loading,
    loaded: state[moduleName].loaded,
}), {loadEvents, selectEvent})(EventsList);
