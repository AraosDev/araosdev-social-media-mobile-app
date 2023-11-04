import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import { AppFormProps } from '../../@types/common';

function AppForm(props: AppFormProps): React.ReactElement {
    const { label = '', onChangeText, value = '', formStyle = {}, style = {}, inputProps = {} } = props;
    const { container, inputStyle, labelStyle } = styles;
    const { placeholderTextColor = colors.appBgGradient1, ...restInputProps } = inputProps;
    return (
        <View style={[container, style]}>
            {label && <Text style={[labelStyle]}>{label}</Text>}
            <TextInput
                {...restInputProps}
                value={value}
                onChangeText={onChangeText}
                style={[inputStyle, formStyle]}
                placeholderTextColor={placeholderTextColor}
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
        fontWeight: '500',
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