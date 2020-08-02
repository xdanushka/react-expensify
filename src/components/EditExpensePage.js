import React from 'react';
import { connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import  {editExpense, removeExpense} from '../actions/expenses'

export class EditExpensePage extends React.Component{
    onClick = () => {
        this.props.onRemove(this.props.expense.id);
        this.props.history.push('/');
    }

    onSubmit = (expense) => {
        this.props.onEdit(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <ExpenseForm 
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}/>
                <button onClick={this.onClick}>
                    Remove
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense)=>expense.id===props.match.params.id) 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRemove: (id) => dispatch(removeExpense({id})),
        onEdit: (id, expense) =>dispatch(editExpense(id,expense))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)