import selectedExpensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('should return 0 if no expenses', () => {
    expect(selectedExpensesTotal([])).toBe(0);
})

test('should correctly add single expense', () => {
    expect(selectedExpensesTotal([expenses[0]])).toBe(195);
})

test('should correctly add multiple expenses', () => {
    expect(selectedExpensesTotal(expenses)).toBe(5790);
})