import React from 'react';
import {shallow} from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses'

test('should render AddExpensePage with multiple expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseTotal={1000} expenseCount={2}/>)
    expect(wrapper).toMatchSnapshot();
})

test('should render AddExpensePage with one expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseTotal={100} expenseCount={1}/>)
    expect(wrapper).toMatchSnapshot();
})

