import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import AppStyle from '../../common/styles/styleSheets';
import colors from '../../common/styles/colors';
import GradientText from '../../common/components/GradientText';
import AppForm from '../../common/components/AppForm';
import AppButton from '../../common/components/AppButton';

function AppLogin() {
    const { appBgGradient1, appBgGradient2, appBgGradient3 } = colors;

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <LinearGradient
            colors={[appBgGradient1, appBgGradient2, appBgGradient3]}
            style={[AppStyle.fullFlex, styles.loginContainer]}
        >
            <View style={styles.appHeader}>
                <GradientText style={AppStyle.appNameHeader}>ADSM</GradientText>
            </View>
            <View style={styles.loginForm}>
                <AppForm
                    inputProps={{ placeholder: 'Username/email/phone number' }}
                    value={userName}
                    onChangeText={setUserName}
                />
                <AppForm
                    inputProps={{ placeholder: 'Password', secureTextEntry: true }}
                    value={password}
                    onChangeText={setPassword}
                />
                <View style={styles.actionBtnContainer}>
                    <AppButton
                        outerWrapperStyle={styles.buttonOuter}
                    >
                        Login
                    </AppButton>
                    <AppButton
                        theme='outline'
                        outerWrapperStyle={styles.buttonOuter}
                    >
                        Create Account
                    </AppButton>
                </View>
            </View>
        </LinearGradient>
    );
}

export default AppLogin;

const styles = StyleSheet.create({
    loginContainer: {
        padding: 20
    },
    appHeader: {
        justifyContent: 'flex-end',
        minHeight: 150,
    },
    loginForm: {
        backgroundColor: colors.appTextGradient1,
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 45,
        marginVertical: 20
    },
    actionBtnContainer: {
        marginTop: 20
    },
    buttonOuter: {
        marginBottom: 25
    }
})