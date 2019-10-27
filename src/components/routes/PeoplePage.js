import React, {Component} from 'react';
import NewPersonForm from '../people/NewPersonForm'
import {connect} from 'react-redux';
import {addPerson} from '../../ducks/people';
import PeopleList from '../people/VirtualizedPeopleList';
import {reset} from 'redux-form';


class PeoplePage extends Component {
    handleSubmitForm = (values, dispatch) => {
        const {addPerson} = this.props;
        addPerson(values);
        dispatch(reset('addPerson'))
    };


    render() {
        return (
            <div>
                <NewPersonForm onSubmit = {this.handleSubmitForm} />
                <PeopleList />
            </div>
        );
    };
}

export default connect(null, {addPerson})(PeoplePage);
