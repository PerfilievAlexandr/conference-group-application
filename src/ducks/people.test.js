import uniqid from 'uniqid';
import {addPersonSaga, ADD_PERSON_REQUEST, ADD_PERSON} from '../ducks/people';
import {call, put} from 'redux-saga/effects';

it('should dispatch person with id', () => {
    const person = {
        name: 'Alexandr',
        lastName: 'Perfiliev',
        email: 'test@mail.ru'
    };

    const saga = addPersonSaga({
        type: ADD_PERSON_REQUEST,
        payload: person
    });

    expect(saga.next().value).toEqual(call(uniqid));

    const id = uniqid();

    expect(saga.next(id).value).toEqual(put({
        type: ADD_PERSON,
        payload: {...person, id}
    }))
});