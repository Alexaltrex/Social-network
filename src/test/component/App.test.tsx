import React from 'react';
import ReactDOM from 'react-dom';
import {render} from '@testing-library/react';
import AppContainer from "../../AppContainer";

test('render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppContainer/>, div);
    ReactDOM.unmountComponentAtNode(div)
});
