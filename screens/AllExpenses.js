import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../Store/expenses-context';

function AllExpenses(){
    const expensesCtx = useContext(ExpensesContext)

    return <ExpensesOutput 
        expenses={expensesCtx.expenses} 
        expensesPeriod="Total" 
        fallbackText="No Registered Exepenes Found"
        />
    
}

export default AllExpenses;