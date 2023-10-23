import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import General from './screens/General';
import Followers from './screens/Followers';
import Friends from './screens/Friends';
import ChangePwd from './screens/ChangePwd';
import AppStyle from '../../../common/styles/styleSheets';
import { StyleSheet } from 'react-native';
import colors from '../../../common/styles/colors';

const Drawer = createDrawerNavigator();

function Profile() {
    const { drawerLabelStyle, drawerStyle } = styles;
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle,
                headerStyle: AppStyle.navigationHeader,
                drawerLabelStyle,
                drawerActiveTintColor: '#fff',
                drawerActiveBackgroundColor: colors.appBgGradient2,
                drawerInactiveTintColor: '#000'
            }}
        >
            <Drawer.Screen name='general' component={General} options={{ title: 'General Settings' }} />
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
        fontWeight: 600,
    }
});