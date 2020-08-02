import React from 'react';
import {shallow} from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses'
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';

test('should ExpenseForm correctly', () =>{
    const wrapper = shallow(<ExpenseForm/>);
    expect(wrapper).toMatchSnapshot();
});

test('should ExpenseForm correctly with data', () =>{
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () =>{
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () =>{
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('input').at(0).simulate('change',{
        target: {value}
    });
    expect(wrapper.state('description')).toBe(value);
})

test('should set note on input change', () =>{
    const value = 'New Note';
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('textarea').simulate('change',{
        target: {value}
    });
    expect(wrapper.state('note')).toBe(value);
})

test('should set ammount on valid input change', () =>{
    const value = '15.00';
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('input').at(1).simulate('change',{
        target: {value}
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set ammount on invalid input change', () =>{
    const value = 'xxx';
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find('input').at(1).simulate('change',{
        target: {value}
    });
    expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

test('should set new date on date change', () => {
    const now  = moment();
    const wrapper  = shallow(<ExpenseForm/>);
    wrapper.find(SingleDatePicker).prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
})

test('should update focused on calendar ', () => {
    const focused = true;
    const wrapper  = shallow(<ExpenseForm/>);
    wrapper.find(SingleDatePicker).prop('onFocusChange')({focused});
    expect(wrapper.state('calendarFocused')).toBe(true);
})