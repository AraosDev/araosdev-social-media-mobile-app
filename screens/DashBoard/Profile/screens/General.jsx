import React, { useLayoutEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useMediaLibraryPermissions, PermissionStatus, launchImageLibraryAsync } from 'expo-image-picker';
import AppForm from '../../../../common/components/AppForm';
import colors from '../../../../common/styles/colors';
import AppStyle from '../../../../common/styles/styleSheets';
import { Modal, Pressable, StyleSheet, Image, ScrollView, Alert, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserDetails, setUserDetails } from '../../../../store/slices/loginSlice';
import IconButton from '../../../../common/components/IconButton';
import { useUpdateAccountDataMutation } from '../../../../store/apiSlices/loginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../../common/components/Loader';
import AppButton from '../../../../common/components/AppButton';

function General({ navigation }) {
    const { appBgGradient1, appBgGradient2, appBgGradient3 } = colors;
    const [libPermissionStatus, requireLibPermission] = useMediaLibraryPermissions();
    const dispatch = useDispatch();
    const { photo, userName, email, phoneNumber, token, id: userId } = useSelector((state) => state.loginReducer.userDetails);

    const [updateAccDataTrigger] = useUpdateAccountDataMutation();

    const [isUpdatingData, setUpdatingData] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentDp, setCurrentDp] = useState(null);

    async function isMediaLibraryPermissionsGranted() {
        if (libPermissionStatus.status === PermissionStatus.UNDETERMINED) {
            const response = await requireLibPermission();
            return response.granted;
        } else if (libPermissionStatus.status === PermissionStatus.GRANTED) {
            return true;
        } else {
            return false;
        }
    }

    async function getImageFromLibrary() {
        try {
            if (!(await isMediaLibraryPermissionsGranted())) {
                Alert.alert('Phone Storage Permission Denied', 'Please grant the phone storage permission to take image from media library');
                return;
            }
            const response = await launchImageLibraryAsync({
                quality: 0.5,
                allowsEditing: true,
                aspect: [1, 1]
            });

            setCurrentDp(response.assets[0].uri);
        } catch (e) {
            console.log(e);
            Alert.alert('Some Error occurred while opening the Phone storage', 'Please try again');
        }
        setModalOpen(false);
    }

    function userDetailsChangeHandler(identifier, text) {
        dispatch(changeUserDetails({ [identifier]: text }));
    }

    function updateAccountData() {
        setUpdatingData(true);
        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        if (typeof currentDp === 'string') {
            const fileType = currentDp.split('.').pop();
            const file = { uri: currentDp, name: `${userId}-${Date.now()}.${fileType}`, type: `image/${fileType}` }
            formData.append('photo', file);
        }
        updateAccDataTrigger(formData)
            .unwrap()
            .then(async (response) => {
                const { user, status } = response;
                if (status === 'SUCCESS') {
                    dispatch(setUserDetails({ ...user, token }));
                    await AsyncStorage.setItem('user', JSON.stringify({ ...user, token }));
                    setUpdatingData(false);
                    setCurrentDp(null);
                }
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Updating Data failed', 'Please try again!');
                setUpdatingData(false);
                setCurrentDp(null);
            });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <IconButton
                    icon='save'
                    color={tintColor}
                    style={{ paddingRight: 10 }}
                    onPress={updateAccountData}
                />
            )
        })
    }, [navigation, userName, email, phoneNumber, currentDp, photo]);

    if (isUpdatingData) return (
        <LinearGradient
            colors={[appBgGradient1, appBgGradient2, appBgGradient3]}
            style={[AppStyle.fullFlex]}
        >
            <Loader />
        </LinearGradient>
    );

    return (
        <ScrollView>
            <LinearGradient
                colors={[appBgGradient1, appBgGradient2, appBgGradient3]}
                style={[AppStyle.fullFlex, styles.container]}
            >
                <View style={styles.modalWrapperStyle}>
                    <Modal
                        animationType='slide'
                        visible={isModalOpen}
                        transparent={true}
                        onRequestClose={() => setModalOpen(false)}
                    >
                        <View style={styles.modalWrapperStyle}>
                            <View style={styles.modalBody}>
                                <View style={styles.closeBtnWrapper}>
                                    <IconButton icon='close' size={30} color={colors.appTextGradient3} onPress={() => setModalOpen(false)} />
                                </View>
                                <View style={styles.container}>
                                    <AppButton outerWrapperStyle={styles.photoActionBtn}>Take Image</AppButton>
                                    <AppButton
                                        outerWrapperStyle={styles.photoActionBtn}
                                        onPress={getImageFromLibrary}
                                    >
                                        Pick Image from phone
                                    </AppButton>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                <Pressable
                    style={({ pressed }) => [pressed && styles.pressed, styles.imgContainer]}
                    onPress={() => setModalOpen(true)}
                >
                    <Image source={{ uri: currentDp || photo }} style={styles.displayImg} />
                </Pressable>
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
    pressed: {
        opacity: 0.7,
    },
    container: {
        padding: 40,
    },
    imgContainer: {
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
    },
    modalWrapperStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalBody: {
        backgroundColor: colors.appBgGradient1,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeBtnWrapper: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingTop: 10,
        paddingHorizontal: 20
    },
    photoActionBtn: {
        marginBottom: 20
    }
});