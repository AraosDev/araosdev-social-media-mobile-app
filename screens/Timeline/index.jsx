import { Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../common/styles/colors';
import AppStyle from '../../common/styles/styleSheets';

function TimeLine() {
    const { appBgGradient1, appBgGradient2, appBgGradient3 } = colors;
    return (
        <LinearGradient
            colors={[appBgGradient1, appBgGradient2, appBgGradient3]}
            style={[AppStyle.fullFlexCentre]}
        >
            <Text>Timeline Under development</Text>
        </LinearGradient>
    );
}

export default TimeLine;