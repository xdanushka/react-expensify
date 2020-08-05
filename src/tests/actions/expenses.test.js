import {startAddExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startremoveExpense, startEditExpense} from '../../actions/expenses'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase'
import expenses from '../fixtures/expenses'

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {}
    expenses.forEach(({id, description, note, amount, createdAt})=>{
        expensesData[id] = {description, note, amount, createdAt}
    })
    database.ref('expenses').set(expensesData).then(()=>done());
})

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

// test('should setup add expense action object with values', ()=> {
    
//     const action = addExpense(expenses[0]);    
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: expenses[0]
//     })
// })

test('should setup set expense action object with data', () =>{
    const action = setExpenses(expenses);
    expect(action).toEqual({type: 'SET_EXPENSES', expenses})
})


test('should fetch expenses from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});


test('should add expense to database and store', (done) => {
    const store  = createMockStore({})
    const expenseData = {
        description: 'Mouse',
        amount: 500,
        note: 'nothing',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');

    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })       
    
})

test('should add expense with defaults to database and store',(done)=>{
    const store  = createMockStore({})
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }
    store.dispatch(startAddExpense({})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return  database.ref(`expenses/${actions[0].expense.id}`).once('value');       

    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        done();
    }) 
});

test('should remove expense from firebase', (done) => {
    const store  = createMockStore({})
    store.dispatch(startremoveExpense({id: expenses[1].id})).then(()=>{
        const actions = store.getActions();
        expect(actions[0].type).toBe('REMOVE_EXPENSE');
        return database.ref(`expenses/${expenses[1].id}`).once('value')
    }).then((snapshot) =>{
        expect(snapshot.val()).toBeFalsy();
        done();  
    });
});

test('should update expense in firebese', (done) => {
    const updated = {
        description: 'Updated',
        note: expenses[1].note,
        createdAt:expenses[1].createdAt,
        amount:100
    }
    const store  = createMockStore({})
    store.dispatch(startEditExpense(expenses[1].id, updated)).then(()=>{
        const actions = store.getActions();
        expect(actions[0].type).toBe('EDIT_EXPENSE');
        return database.ref(`expenses/${expenses[1].id}`).once('value')
    }).then((snapshot) =>{
        expect(snapshot.val()).toEqual(updated);
        done();  
    });
});
