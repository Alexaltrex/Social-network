import ProfileStatus from "./ProfileStatus";
import {create} from 'react-test-renderer';
import React from 'react'

describe('ProfileStatus component', () => {
    // пропс status перешел в state
    test('пропс status перешел в локальный стейт', () => {
       const component = create(<ProfileStatus status='testStatus'/>);
       const instance = component.getInstance();
       expect(instance.state.status).toBe('testStatus');
    });
    // вначале editMode = false, нет input, есть span
    test('after mount span with status should be displayed with correct status', () => {
        const component = create(<ProfileStatus status='testStatus'/>);
        const instance = component.getInstance();
        let span = instance.findByType('span');
        expect(span.length).toBe('testStatus');
    });
    // вначале editMode = false, нет input, есть span
    test('after mount span with status should be displayed with correct status', () => {
        const component = create(<ProfileStatus status='testStatus'/>);
        const instance = component.getInstance();
        let span = instance.findByType('span');
        expect(span.length).toBe('testStatus');
    });
});