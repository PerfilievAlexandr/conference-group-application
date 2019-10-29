import React, {Component} from 'react';
import {List} from 'react-virtualized';
import {connect} from 'react-redux';
import Loader from '../Loader';
import PeopleCard from './PeopleCard';
import {fetchAllPersons, peopleLoaded, peopleLoading, peopleSelectorArr} from "../../ducks/people";


class PeopleList extends Component {

    componentDidMount() {
        this.props.fetchAllPersons();
    }

    rowRender = ({index, key, style}) => <PeopleCard person={this.props.people[index]} key={key} style={style} />;

    render() {
        const {people, loading, loaded} = this.props;

        if (!loaded) return <Loader />;

        return (
            <List
                height={300}
                width={500}
                rowCount={people.length}
                rowRenderer={this.rowRender}
                rowHeight={100}
            />
        );
    };
}

export default connect(state => ({
    people: peopleSelectorArr(state),
    loading: peopleLoading(state),
    loaded: peopleLoaded(state)
}), {fetchAllPersons})(PeopleList);
