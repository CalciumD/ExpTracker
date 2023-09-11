import { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native'

import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues}){
    //values for form submission
    const [inputs, setInputs] = useState({
        amount: { 
            value: defaultValues ? defaultValues.amount.toString() : '', 
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true,
        },
    });

    /** Function */
    function inputChangedHandler(inputIdentifier, enteredValue){
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true},
            };
        });
    }

    function submitHandler(){
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.amount.value, isValid: dateIsValid },
                    description: {
                        value: curInputs.description.value,
                        isValid: descriptionIsValid,
                    }
                }
            });
            Alert.alert('Invalid Input');
            return;
        }

        onSubmit(expenseData);
    }

    const formisInvalid = 
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid;

    return (
    <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input style={styles.rowInput} 
            label="Amount"
            invalid={!inputs.amount.isValid}
            textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: inputChangedHandler.bind(this, 'amount'),
                value: inputs.amount.value,
            }}/>
            <Input 
                style={styles.rowInput} 
                label="Date" 
                invalid={!inputs.date.isValid}
                textInputConfig={{
                    placeHolder: 'DD/MM/YYYY',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputs.date.value,
            }} />
            </View>
            <Input 
                label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                multiline: true,
                //autoCapitalize: 'none',
                //autoCorrect: falsea
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputs.description.value,
            }}/>
            {
             formisInvalid && (<Text style={styles.errorText}>Invalid input values - please check your entered data!</Text> )
            }
            <View style={styles.buttons}>
                    <Button style={styles.button} mode="flat" onPress={onCancel}>
                        Cancel
                    </Button>
                    <Button style={styles.button} onPress={submitHandler}>
                        {submitButtonLabel}
                    </Button>
            </View>
    </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form:{
        marginTop: 50,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput:{
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
      },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});