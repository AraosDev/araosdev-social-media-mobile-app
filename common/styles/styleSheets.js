import { StyleSheet } from "react-native";

const fullFlex = { flex: 1 };

const AppStyle = StyleSheet.create({
    fullFlex,
    fullFlexCentre: {
        ...fullFlex,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appNameHeader: {
        fontSize: 45,
        fontWeight: 'bold',
    }
});

export default AppStyle