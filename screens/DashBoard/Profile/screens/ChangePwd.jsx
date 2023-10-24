import { ScrollView, StyleSheet, View, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../../../common/styles/colors';
import AppStyle from '../../../../common/styles/styleSheets';
import AppForm from '../../../../common/components/AppForm';
import IconButton from '../../../../common/components/IconButton';
import { useUpdatePasswordMutation } from '../../../../store/apiSlices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeUserDetails } from '../../../../store/slices/authReducer';
import Loader from '../../../../common/components/Loader';

function ChangePwd({ navigation }) {
    const { appBgGradient1, appBgGradient2, appBgGradient3 } = colors;

    const dispatch = useDispatch();
    const [updatePwdTrigger] = useUpdatePasswordMutation();

    const { userDetails } = useSelector((state) => state.authReducer);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isUpdatingPwd, setUpdatingPwd] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <IconButton
                    icon='save'
                    color={tintColor}
                    onPress={onChangePassword}
                    style={{ paddingRight: 10 }}
                />
            )
        });
    }, [navigation, oldPassword, newPassword, confirmNewPassword]);

    function resetForm() {
        setUpdatingPwd(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }

    function onChangePassword() {
        setUpdatingPwd(true);
        updatePwdTrigger({ oldPassword, newPassword, confirmNewPassword })
            .unwrap()
            .then(async (response) => {
                const { status, token } = response;
                if (status === 'SUCCESS') {
                    await AsyncStorage.setItem('user', JSON.stringify({ ...userDetails, token }));
                    dispatch(changeUserDetails({ token }));
                    resetForm();
                    Alert.alert('Update Password Success', '');
                }
            })
            .catch((err) => {
                const { message = '' } = { ...err };
                console.log(err);
                Alert.alert('Update Password Failed', message || 'Please try again!!');
                resetForm();
            });
    }

    if (isUpdatingPwd) return (
        <LinearGradient
            colors={[appBgGradient1, appBgGradient2, appBgGradient3]}
            style={[AppStyle.fullFlex]}
        >
            <Loader />
        </LinearGradient>
    );

    return (
        <LinearGradient
            colors={[appBgGradient1, appBgGradient2, appBgGradient3]}
            style={[AppStyle.fullFlex]}
        >
            <ScrollView style={[AppStyle.fullFlex]}>
                <View style={styles.container}>
                    <AppForm
                        label='Old Password'
                        inputProps={{ placeholder: 'Old Password', secureTextEntry: true }}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        formStyle={styles.input}
                        style={styles.inputWrapper}
                    />
                    <AppForm
                        label='New Password'
                        inputProps={{ placeholder: 'New Password', secureTextEntry: true }}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        formStyle={styles.input}
                        style={styles.inputWrapper}
                    />
                    <AppForm
                        label='Confirm New Password'
                        inputProps={{ placeholder: 'Confirm New Password', secureTextEntry: true }}
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                        formStyle={styles.input}
                        style={styles.inputWrapper}
                    />
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

export default ChangePwd;

const styles = StyleSheet.create({
    container: {
        margin: 40,
    },
    input: {
        backgroundColor: colors.appBgBlue1,
        color: '#fff',
    },
    inputWrapper: {
        marginTop: 20
    },
});