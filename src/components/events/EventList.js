import React, {Component} from 'react';
import {connect} from 'react-redux';
import {moduleName, entitiesSelector, eventListSelector} from '../../ducks/events';
import {loadEvents} from '../../ducks/events';

class EventsList extends Component {

    componentDidMount() {
        this.props.loadEvents();
    }

    getRows = () => {
        const {events, loaded} = this.props;

        return loaded && events.map(row => {
            return (
                <tr key={row.id}>
                    <td>{row.title}</td>
                    <td>{row.where}</td>
                    <td>{row.month}</td>
                </tr>
            )
        })
    };

    render() {

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
    loaded: state[moduleName].loaded
}), {loadEvents})(EventsList);
