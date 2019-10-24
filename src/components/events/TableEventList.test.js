// import React from 'react';
// import Enzyme, {shallow} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import {EventsList} from './EventList';
// import events from '../../mock/conferences';
// import Loader from '../Loader';
//
// Enzyme.configure({ adapter: new Adapter() });
//
// describe('<EventList />', () => {
//     const testEvents = events.map(event => ({...event, id: Math.random().toString()}));
//     it('<Loader /> render', () => {
//         const wrapper = shallow(<EventsList loaded/>);
//
//         expect(wrapper.contains(<Loader/>))
//     })
// });