import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import ErrorField from '../auth/ErrorField';

class NewPersonForm extends Component {
    render() {

        const {handleSubmit} = this.props;

        return (
            <div>
                <h1>Add user</h1>
                <form onSubmit={handleSubmit}>
                    <Field name='name' component={ErrorField} />
                    <Field name='lastName' component={ErrorField} />
                    <Field name='email' component={ErrorField}  />
                    <div>
                        <input type='submit' />
                    </div>
                </form>
            </div>
        );
    };
}

const validate = ({name, lastName, email}) => {
    const errors = {};

    if (!name) errors.name = 'email is required';
    if (!lastName) errors.lastName = 'lastName is required';
    if (!email) errors.email = 'password is required';

    return errors
};

export default reduxForm({
    form: 'addPerson',
    validate
})(NewPersonForm);