import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import AppForm from '../../../../common/components/AppForm';
import colors from '../../../../common/styles/colors';
import AppStyle from '../../../../common/styles/styleSheets';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import { changeUserDetails } from '../../../../store/slices/loginSlice';

function General() {
    const { appBgGradient1, appBgGradient2, appBgGradient3 } = colors;
    const dispatch = useDispatch();
    const { photo, userName, email, phoneNumber } = useSelector((state) => state.loginReducer.userDetails)

    function userDetailsChangeHandler(identifier, text) {
        dispatch(changeUserDetails({ [identifier]: text }));
    }
    return (
        <ScrollView>
            <LinearGradient
                colors={[appBgGradient1, appBgGradient2, appBgGradient3]}
                style={[AppStyle.fullFlex, styles.container]}
            >

                <Image source={{ uri: photo }} style={styles.displayImg} />
                <AppForm
                    label='User name'
                    inputProps={{ placeholder: 'User name' }}
                    value={userName}
                    onChangeText={userDetailsChangeHandler.bind(this, 'userName')}
                    formStyle={styles.input}
                    style={styles.inputWrapper}
                />
                <AppForm
                    label='Email'
                    inputProps={{ placeholder: 'Email', keyboardType: 'email-address' }}
                    value={email}
                    onChangeText={userDetailsChangeHandler.bind(this, 'email')}
                    formStyle={styles.input}
                    style={styles.inputWrapper}
                />
                <AppForm
                    label='Phone Number'
                    inputProps={{ placeholder: 'Phone Number', keyboardType: 'number-pad' }}
                    value={phoneNumber}
                    onChangeText={userDetailsChangeHandler.bind(this, 'phoneNumber')}
                    formStyle={styles.input}
                    style={styles.inputWrapper}
                />
            </LinearGradient>
        </ScrollView>
    );
}

export default General;

const styles = StyleSheet.create({
    container: {
        padding: 40,
        alignItems: 'center',
    },
    displayImg: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    input: {
        backgroundColor: colors.appBgBlue1,
        color: '#fff',
    },
    inputWrapper: {
        marginTop: 20
    }
});