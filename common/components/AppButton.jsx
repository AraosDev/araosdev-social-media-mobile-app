import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../styles/colors';

function AppButton({ theme = '', onPress, children, innerWrapperStyle = {}, outerWrapperStyle = {} }) {
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