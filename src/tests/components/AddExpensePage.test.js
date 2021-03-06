import React from 'react';
import {shallow} from 'enzyme'
import {AddExpensePage} from '../../components/AddExpensePage';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses'

let startAddExpense, history, wrapper;

beforeEach (()=>{
    startAddExpense = jest.fn();
    history = {push: jest.fn()};
    wrapper = shallow(<AddExpensePage onSubmit={startAddExpense} history={history}/>)
})

test('should render AddExpensePage', () => {   
    expect(wrapper).toMatchSnapshot();
})

test('should handle onSubmit', () => {
    wrapper.find(ExpenseForm).prop('onSubmit')(expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[0])
})