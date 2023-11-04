import { StyleSheet } from "react-native";
import colors from "./colors";

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
    },
    navigationHeader: {
        backgroundColor: colors.appBgGradient1,
        elevation: 4
    },
});

export default AppStyle