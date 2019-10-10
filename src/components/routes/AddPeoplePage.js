import React, {Component} from 'react';
import NewPersonForm from '../people/NewPersonForm'
import {connect} from 'react-redux';
import {addPerson} from '../../ducks/people';


class AddPeoplePage extends Component {
    render() {
        return (
            <div>
                <h2>Add new person</h2>
                <NewPersonForm onSubmit = {this.props.addPerson} />
            </div>
        );
    };
}

export default connect(null, {addPerson})(AddPeoplePage);
