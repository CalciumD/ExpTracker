import { View, StyleSheet  } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';


const DUMMY_EXP = [
    {
        id: 'e1',
        description: 'A piar of boots',
        amount: 59.99,
        date: new Date('2022-09-25'),
    },
    {
        id: 'e2',
        description: 'Trousers',
        amount: 89.24,
        date: new Date('2022-09-23'),
    },{
        id: 'e3',
        description: 'Some Apples',
        amount: 5.99,
        date: new Date('2022-09-24'),
    },
    {
        id: 'e4',
        description: 'A piar of boots',
        amount: 59.99,
        date: new Date('2022-09-25'),
    },
    {
        id: 'e5',
        description: 'Trousers',
        amount: 89.24,
        date: new Date('2022-09-23'),
    },{
        id: 'e6',
        description: 'Some Apples',
        amount: 5.99,
        date: new Date('2022-09-24'),
    },
    {
        id: 'e7',
        description: 'A piar of boots',
        amount: 59.99,
        date: new Date('2022-09-25'),
    },
    {
        id: 'e8',
        description: 'Trousers',
        amount: 89.24,
        date: new Date('2022-09-23'),
    },
    {
        id: 'e9',
        description: 'Some Apples',
        amount: 5.99,
        date: new Date('2022-09-24'),
    },
]



function ExpensesOutput({expenses, expensesPeriod}){
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            <ExpensesList expenses={expenses} />
        </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({

    container: {
        paddingHorizontal:  24,
        paddingTop: 24, 
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1,

    }

});