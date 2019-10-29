import React, {Component} from 'react';
import Root from './components/Root';
import store from './redux';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import history from './history';
import './mock';
import './config';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <DndProvider backend={HTML5Backend}>
                        <Root/>
                    </DndProvider>
                </ConnectedRouter>
            </Provider>
        );
    };
}

export default App;
