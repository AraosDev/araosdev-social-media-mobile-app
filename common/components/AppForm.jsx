import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler';
import colors from '../styles/colors';

function AppForm({ label = '', onChangeText, value = '', formStyle = {}, style = {}, inputProps = {} }) {
    const { container, inputStyle, labelStyle } = styles;
    return (
        <View style={[container, style]}>
            {label && <Text style={[labelStyle]}>{label}</Text>}
            <TextInput
                {...inputProps}
                value={value}
                onChangeText={onChangeText}
                style={[inputStyle, formStyle]}
                placeholderTextColor={colors.appTextGradient3}
            />
        </View>
    );
}

export default AppForm;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    labelStyle: {
        fontSize: 18,
        fontWeight: 500,
    },
    inputStyle: {
        backgroundColor: colors.appBgGradient2,
        marginVertical: 10,
        borderRadius: 4,
        padding: 10,
        color: '#000',
        fontSize: 18
    }
})