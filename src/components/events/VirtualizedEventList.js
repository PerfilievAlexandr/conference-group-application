import React, {Component} from 'react';
import {connect} from 'react-redux';
import {moduleName, eventListSelector} from '../../ducks/events';
import {loadLazy, selectEvent} from '../../ducks/events';
import Loader from "../Loader";
import {Table, Column, InfiniteLoader} from 'react-virtualized';
import 'react-virtualized/styles.css';
import conferences from '../../mock/conferences';
import CustomRowRendererComponent from './CustomRowRendererComponent';

export class EventsList extends Component {

    componentDidMount() {
        this.props.loadLazy();
    };

    handleRowClick = ({rowData}) => this.props.selectEvent(rowData.id);

    rowGetter = ({index}) => {
       return this.props.events[index];
    };

    isRowLoaded = ({index}) => !!this.props.events[index];

    loadMoreRows = () => {
        this.props.loadLazy()
    };

    rowRenderer = (props) => <CustomRowRendererComponent {...props}/>;

    render() {
        const {events, loading, loaded} = this.props;
        if (!loaded) return <Loader/>;
        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={conferences.length}
            >
                {({onRowsRendered, registerChild}) => (
                    <Table
                        headerHeight={50}
                        height={400}
                        rowCount={events.length}
                        rowGetter={this.rowGetter}
                        rowHeight={30}
                        width={700}
                        onRowClick={this.handleRowClick}
                        onRowsRendered={onRowsRendered}
                        ref={registerChild}
                        rowRenderer={this.rowRenderer}
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
                )}
            </InfiniteLoader>
        );
    };
}

export default connect((state) => ({
    events: eventListSelector(state),
    loaded: state[moduleName].loaded,
    loading: state[moduleName].loading,
}), {loadLazy, selectEvent})(EventsList);
