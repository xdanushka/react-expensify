import React from 'react';
import {connect}  from 'react-redux';
import numaral from 'numeral';
import getTotalExpenses from '../selectors/expenses-total'
import getVisibleExpenses from '../selectors/expenses'

export const ExpensesSummary = (props) => {
    const expenseWord = props.expenseCount == 1 ? 'expense' : 'expenses'
    const formattedExpenseTotal = numaral(props.expenseTotal / 100).format('$0,0.0');
    return (
        <div>
            <h1>Viewing {props.expenseCount} {expenseWord} totalling {formattedExpenseTotal}</h1>
        </div>
    )
}

const mapStateToProps = (state) =>{
    const visibeleExpenses = getVisibleExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibeleExpenses.length,
        expenseTotal: getTotalExpenses(visibeleExpenses)
    }  

}

export default connect(mapStateToProps)(ExpensesSummary);