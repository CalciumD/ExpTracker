import axios from "axios";

const url = 'https://expensetracker-c9683-default-rtdb.firebaseio.com';

export function storeExpense(expenseData){
    axios.post(url + '/expenses.json', expenseData);
}

export async function fetchExpenses(){
    const response = await axios.get(url + '/expenses.json');
    
    //array
    const expenses = [];

    for(const key in response.data){
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }
        expenses.push(expenseObj);
    }
    return expenses;
}



// Promise is an object that will give you access to other data.
