import React from 'react';
import {connect}  from 'react-redux';
import getVisibleExpenses from '../selectors/expenses'
import ExpenseListItem from './ExpenseListItem';

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No Expenses</p>
            ) : (
                props.expenses.map((ex)=>{
                    return (<ExpenseListItem key={ex.id} expense={ex} {...ex} />)
                })
            )
        }
    </div>
);

const mapStateToProps = (state) =>{
    return {
        expenses: getVisibleExpenses(state.expenses,state.filters)
    }
}

export default connect(mapStateToProps)(ExpenseList);