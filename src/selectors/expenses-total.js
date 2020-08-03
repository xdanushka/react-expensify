
export default (expenses=[]) => {
    return expenses
        .map((ex) => ex.amount)
        .reduce((sum, value) => sum + value,0)
}