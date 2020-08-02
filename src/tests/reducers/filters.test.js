import filterReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter value', () => {
    const state = filterReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate:moment().startOf('month'),
        endDate:moment().endOf('month'),
    })
});

test('should set sort by amount', () => {
    const state = filterReducer(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'amount',
        startDate:moment().startOf('month'),
        endDate:moment().endOf('month'),
    })
});

test('should set sort by date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate:moment().startOf('month'),
        endDate:moment().endOf('month'),
    }
    const state = filterReducer(currentState, {type: 'SORT_BY_DATE'});
    
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const currentState = {
        text: '',
        sortBy: 'date',
        startDate:moment().startOf('month'),
        endDate:moment().endOf('month'),
    }
    const state = filterReducer(currentState, {type: 'SET_TEXT_FILTER', text:'w'});
    
    expect(state.text).toBe('w');
});

test('should set startDate filter', () => {
    const currentState = {
        text: '',
        sortBy: 'date',
        startDate:undefined,
        endDate:undefined,
    }
    const action = {type: 'SET_START_DATE', startDate:moment(0)}
    const state = filterReducer(currentState, action);
    
    expect(state.startDate).toEqual(moment(0));
});

test('should set endDate filter', () => {
    const currentState = {
        text: '',
        sortBy: 'date',
        startDate:undefined,
        endDate:undefined,
    }
    const action = {type: 'SET_END_DATE', endDate:moment(0)}
    const state = filterReducer(currentState, action);
    
    expect(state.endDate).toEqual(moment(0));
});