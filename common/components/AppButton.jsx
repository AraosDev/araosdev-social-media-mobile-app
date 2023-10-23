import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../styles/colors';
import { MaterialIcons } from '@expo/vector-icons';

function AppButton({ theme = '', onPress, children, innerWrapperStyle = {}, outerWrapperStyle = {}, icon }) {
    return (
        <Pressable
            style={({ pressed }) => [
                pressed && styles.pressed,
                theme === 'outline' ? styles.transparentBg : styles.primaryBg,
                outerWrapperStyle
            ]}
            onPress={onPress}
        >
            <View
                style={[
                    styles.buttonContainer,
                    innerWrapperStyle
                ]}
            >
                {icon && <MaterialIcons style={styles.iconStyle} name={icon} size={24} color="white" />}
                <Text style={styles.btnLabelStyle}>{children}</Text>
            </View>
        </Pressable>
    );
}

export default AppButton;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
    },
    buttonContainer: {
        padding: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    iconStyle: {
        marginRight: 15,
    },
    transparentBg: {
        borderRadius: 4,
        borderColor: colors.appBgGradient3,
        borderWidth: 2
    },
    primaryBg: {
        backgroundColor: colors.appBgGradient3,
        borderRadius: 4,
    },
    btnLabelStyle: {
        color: '#fff',
        fontSize: 16
    }
});