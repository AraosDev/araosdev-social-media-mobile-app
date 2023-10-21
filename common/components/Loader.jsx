import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../styles/colors';

function Loader() {
    return (
        <View style={styles.root}>
            <ActivityIndicator size={100} color={colors.appTextGradient3} />
        </View>
    );
}

export default Loader;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});