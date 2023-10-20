import { Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import AppStyle from '../../common/styles/styleSheets';
import colors from '../../common/styles/colors';

function AppLogin() {
    const { appBgGradient1, appBgGradient2, appBgGradient3 } = colors;

    return (
        <LinearGradient
            colors={[appBgGradient1, appBgGradient2, appBgGradient3]}
            style={AppStyle.fullFlexCentre}
        >
            <Text>AppLogin</Text>
        </LinearGradient>
    );
}

export default AppLogin;