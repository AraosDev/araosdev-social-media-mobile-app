import { Alert, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import AppStyle from '../../common/styles/styleSheets';
import colors from '../../common/styles/colors';
import GradientText from '../../common/components/GradientText';
import AppForm from '../../common/components/AppForm';
import AppButton from '../../common/components/AppButton';
import { useLoginMutation } from '../../store/apiSlices/loginSlice';
import Loader from '../../common/components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../store/slices/loginSlice';

function AppLogin() {
    const { appBgGradient1, appBgGradient2, appBgGradient3 } = colors;
    const dispatch = useDispatch();
    const [loginTrigger] = useLoginMutation();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginLoading, setLoginLoading] = useState(false);

    function onLogin() {
        setLoginLoading(true);
        const body = { userDetail: userName, password };
        loginTrigger(body)
            .unwrap()
            .then(async (response) => {
                const { status, token, user } = response;
                if (status === 'SUCCESS') {
                    await AsyncStorage.setItem('user', JSON.stringify({ token, user }));
                    setLoginLoading(false);
                    dispatch(setUserDetails(user));
                    // navigation.navigate('dashboard');
                }
            })
            .catch((err) => {
                console.log(err);
                setLoginLoading(false);
                setUserName('');
                setPassword('');
                Alert.alert('Login Failed', err.data.message);
            });
    }

    return (
        <LinearGradient
            colors={[appBgGradient1, appBgGradient2, appBgGradient3]}
            style={[AppStyle.fullFlex, styles.loginContainer]}
        >
            {isLoginLoading ? <Loader /> : (
                <>
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
                                onPress={onLogin}
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
                </>
            )}
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