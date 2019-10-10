import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'


class SignInForm extends Component {

    render() {

        const {handleSubmit} = this.props;

        return (
            <div>
                <h1>Sign in</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <Field name='email' component='input' />
                    </div>
                    <div>
                        <label>Password</label>
                        <Field name='password' component='input' type='password' />
                    </div>
                    <div>
                        <input type='submit' />
                    </div>
                </form>
            </div>
        );
    };
}

export default reduxForm({
    form: 'auth'
})(SignInForm);