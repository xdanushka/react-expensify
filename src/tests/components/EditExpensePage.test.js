import React from 'react';
import {shallow} from 'enzyme'
import {EditExpensePage} from '../../components/EditExpensePage';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses'

let onEdit, onRemove, history, wrapper;

beforeEach (()=>{
    onEdit = jest.fn();
    onRemove = jest.fn();
    history = {push: jest.fn()};
    wrapper = shallow(<EditExpensePage onEdit={onEdit} onRemove={onRemove} history={history} expense={expenses[0]}/>)
})

test('should render EditExpensePage', () => {   
    expect(wrapper).toMatchSnapshot();
})

test('should edit expense', () => {
    wrapper.find(ExpenseForm).prop('onSubmit')(expenses[0]);    
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(onEdit).toHaveBeenLastCalledWith(expenses[0].id, expenses[0])
})

test('should remove expense', () => {
    wrapper.find('button').simulate('click');    
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(onRemove).toHaveBeenLastCalledWith(expenses[0].id)
})