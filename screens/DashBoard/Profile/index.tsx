import React from 'react'
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import General from './screens/General';
import Followers from './screens/Followers';
import Friends from './screens/Friends';
import ChangePwd from './screens/ChangePwd';
import Timeline from '../Timeline'
import AppStyle from '../../../common/styles/styleSheets';
import AppButton from '../../../common/components/AppButton';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import colors from '../../../common/styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logOut } from '../../../store/slices/authReducer';
import { useAppDispatch } from '../../../store/hooks';

const Drawer = createDrawerNavigator();

function CustomDrawer(props) {
    const dispatch = useAppDispatch();

    async function onLogout() {
        await AsyncStorage.removeItem('user');
        dispatch(logOut());
    }

    return (
        <SafeAreaView style={AppStyle.fullFlex}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={styles.logoutBtnContainer}>
                <AppButton
                    onPress={onLogout}
                    outerWrapperStyle={styles.logoutBtn}
                    icon="logout"
                >
                    Logout
                </AppButton>
            </View>
        </SafeAreaView>
    );
}

function Profile(): React.ReactElement {
    const { drawerLabelStyle, drawerStyle } = styles;
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                drawerStyle,
                headerStyle: AppStyle.navigationHeader,
                drawerLabelStyle,
                drawerActiveTintColor: '#fff',
                drawerActiveBackgroundColor: colors.appBgGradient2,
                drawerInactiveTintColor: '#000'
            }}
        >
            <Drawer.Screen
                name='general'
                component={General}
                options={{
                    title: 'General Settings',
                }}
            />
            <Drawer.Screen name='posts' component={Timeline} options={{ title: 'Your Posts' }} />
            <Drawer.Screen name='followers' component={Followers} options={{ title: 'Followers' }} />
            <Drawer.Screen name='friends' component={Friends} options={{ title: 'Friends' }} />
            <Drawer.Screen name='changePwd' component={ChangePwd} options={{ title: 'Change Password' }} />
        </Drawer.Navigator>
    );
}

export default Profile;

const styles = StyleSheet.create({
    drawerStyle: {
        backgroundColor: colors.appBgGradient1
    },
    drawerLabelStyle: {
        fontWeight: '600',
    },
    logoutBtnContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 8,
    },
    logoutBtn: {
        backgroundColor: colors.appBgGradient3,
        borderColor: colors.appBgGradient3,
        margin: 30
    }
});