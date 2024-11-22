// components/forms/BudgetForm.tsx
import React from 'react';
import { View, TextInput, Button } from 'react-native';

export default function BudgetForm({ initialValues, onSubmit }) {
    const [formValues, setFormValues] = React.useState(initialValues || { title: '', amount: '' });

    const handleChange = (key, value) => {
        setFormValues({ ...formValues, [key]: value });
    };

    return (
        <View>
            <TextInput
                placeholder="Budget Title"
                value={formValues.title}
                onChangeText={(value) => handleChange('title', value)}
            />
            <TextInput
                placeholder="Amount"
                value={formValues.amount}
                onChangeText={(value) => handleChange('amount', value)}
            />
            <Button title="Save" onPress={() => onSubmit(formValues)} />
        </View>
    );
}
