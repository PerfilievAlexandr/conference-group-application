import React, {Component} from 'react';


class PeopleCard extends Component {

    render() {
        const {person, style} = this.props;

        return (
            <div style={{width: 200, height: 100, ...style}}>
                <h3>{person.name} {person.lastName}</h3>
                <p>{person.email}</p>
            </div>
        );
    };
}

export default PeopleCard
