import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import {addExpense} from './actions/expenses'
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

const unsubscribe = store.subscribe(()=>{
    const state = store.getState();
    const vexpenses = getVisibleExpenses(state.expenses, state.filters)
    // console.log(vexpenses)
})

var expense = store.dispatch(addExpense(
    {
        description: 'rent',
        note: 'test note',
        amount: 50,
        createdAt: 100
    }
));

store.dispatch(addExpense(
    {
        description: 'other',
        note: 'other note',
        amount: 500,
        createdAt: -1000
    }
))

store.dispatch(addExpense(
    {
        description: 'water bill',
        note: 'january water bill',
        amount: 250,
        createdAt: 1000
    }
))


//store.dispatch(removeExpense({id: expense.expense.id}));
//store.dispatch(editExpense(expense.expense.id, {amount:100}));

//store.dispatch(setTextFilter('rent'));
//store.dispatch(sortByDate());
//store.dispatch(sortByAmount());
//store.dispatch(setStartDate(125));


const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

