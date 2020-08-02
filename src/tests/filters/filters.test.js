import {setEndDate, setStartDate,sortByAmount, sortByDate,setTextFilter} from '../../actions/filters';
import moment from 'moment';

test('should generate setStartData action object', ()=>{
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
})

test('should generate setEndData action object', ()=>{
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
})

test('should generate sortByAmount action object', ()=>{
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
})

test('should generate sortByDate action object', ()=>{
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    })
})

test('should generate setTextFilter action object with value', ()=>{
    const action = setTextFilter('Rent');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'Rent'
    })
})

test('should generate setTextFilter action object without value', ()=>{
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})