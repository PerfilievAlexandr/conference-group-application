import React, {Component} from 'react';
import {connect} from 'react-redux';
import { peopleIdSelector } from '../../ducks/people'

class PersonCardPreview extends Component {
    render() {
        const { person } = this.props;
        return (
           <h1>{person.name}</h1>
        );
    };
}


export default connect((state, props) => ({
    person: peopleIdSelector(state, props)
}))(PersonCardPreview)
