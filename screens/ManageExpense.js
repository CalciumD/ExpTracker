import { Text, View, StyleSheet } from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../Store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExepenseForm';
import { storeExpense } from '../util/http';

function ManageExpense({route, navigation}){
    const expensesCtx = useContext(ExpensesContext)

    const editedExspenseId = route.params?.expenseId;
    const isEditing = !!editedExspenseId;

    const selectedExpense = expensesCtx.expenses.find(
        (expense) => expense.id === editedExspenseId
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    /* Deletes the Expense Function */
    function deleteExpenseHandler(){
        expensesCtx.deleteExpense(editedExspenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler(expenseData) {
        
        if(isEditing){
            expensesCtx.updateExpense(editedExspenseId, expenseData);
        }else{
            storeExpense(expenseData);
            expensesCtx.addExpense(expenseData);
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseForm 
                submitButtonLabel={isEditing ? 'Update': 'Add'} 
                onCancel={cancelHandler} 
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
            />
            {isEditing && (    
            <View style={styles.deleteContainer}>
                <IconButton 
                    icon="trash" 
                    color={GlobalStyles.colors.error500} 
                    size={36} 
                    onPress={deleteExpenseHandler} 
                    />
            </View>
            )}
        </View>
    );
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24, 
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    }
});