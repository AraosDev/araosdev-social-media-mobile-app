import { View, Text } from 'react-native'
import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../styles/colors';

function GradientText(props) {
    const textStyle = props.style ? [props.style, { opacity: 0 }] : [{ opacity: 0 }];

    const { appTextGradient1, appTextGradient2, appTextGradient3 } = colors;
    return (
        <MaskedView maskElement={<Text {...props} />}>
            <LinearGradient colors={[appTextGradient1, appTextGradient2, appTextGradient3]}>
                <Text {...props} style={textStyle}>{props.children}</Text>
            </LinearGradient>
        </MaskedView>
    );
}

export default GradientText;