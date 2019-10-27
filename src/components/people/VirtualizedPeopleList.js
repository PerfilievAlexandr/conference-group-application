import React, {Component} from 'react';
import {connect} from 'react-redux';
import {peopleSelectorArr, fetchAllPersons, peopleLoading, peopleLoaded} from '../../ducks/people';
import Loader from '../Loader';
import { Column, Table } from 'react-virtualized';

class VirtualizedPeopleList extends Component {
    componentDidMount(){
        this.props.fetchAllPersons();
    };

    rowGetter = ({index}) => this.props.people[index];

    render() {
        const {people, loading, loaded} = this.props;
        if (!loaded) return <Loader />;
        return (
            <Table
                headerHeight={50}
                height={500}
                rowCount={people.length}
                rowGetter={this.rowGetter}
                rowHeight={30}
                width={600}
            >
                <Column
                    width={200}
                    dataKey='name'
                    label='name'
                />
                <Column
                    width={200}
                    dataKey='lastName'
                    label='lastName'
                />
                <Column
                    width={200}s
                    dataKey='email'
                    label='email'
                />
            </Table>
        );
    };
}

export default connect(state => ({
    people: peopleSelectorArr(state),
    loading: peopleLoading(state),
    loaded: peopleLoaded(state)
}), {fetchAllPersons})(VirtualizedPeopleList);