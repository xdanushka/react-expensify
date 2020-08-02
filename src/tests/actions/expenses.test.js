import {addExpense, editExpense, removeExpense} from '../../actions/expenses'

test('should setup remove expense action object', ()=> {
    const action = removeExpense({id:'123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should setup edit expense action object', ()=> {
    const action = editExpense('123abc',  {'description':'test'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {'description':'test'}
    })
})

test('should setup add expense action object with values', ()=> {
    const expenseData = {
        description: 'rent',
        amount: 500,
        createdAt:1000,
        note: 'last month'
    }
    const action = addExpense(expenseData);
    
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
})

test('should setup add expense action object with defaults', ()=> {

    const expenseData = {
        description: '',
        amount: 0,
        createdAt:0,
        note: ''
    }

    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
})