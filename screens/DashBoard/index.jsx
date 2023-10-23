import React from 'react'
import colors from '../../common/styles/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Timeline from './Timeline';
import { Entypo } from '@expo/vector-icons';
import { Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import SearchFriends from './SearchFriends';
import Profile from './Profile';

const Tab = createBottomTabNavigator();
function DashBoard() {
    const { userDetails } = useSelector((state) => state.loginReducer);
    const { photo } = userDetails;
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabStyle,
                tabBarActiveTintColor: colors.appBgGradient1,
                tabBarLabelStyle: {
                    fontSize: 14
                }
            }}
        >
            <Tab.Screen
                name='timeline'
                component={Timeline}
                options={{
                    tabBarIcon: ({ size, color }) => <Entypo name="home" size={size} color={color} />,
                    tabBarLabel: 'Timeline'
                }}
            />
            <Tab.Screen
                name='search'
                component={SearchFriends}
                options={{
                    tabBarIcon: ({ size, color }) => <Entypo name="magnifying-glass" size={size} color={color} />,
                    tabBarLabel: 'Search Friends'
                }}
            />
            <Tab.Screen
                name='profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Image
                            source={{ uri: photo }}
                            style={{ width: size, height: size, borderRadius: size / 2 }}
                        />
                    ),
                    tabBarLabel: 'Profile'
                }}
            />
        </Tab.Navigator>
    );
}

export default DashBoard;

const styles = StyleSheet.create({
    tabStyle: {
        backgroundColor: '#313b82',
        padding: 10,
        height: 60
    }
});