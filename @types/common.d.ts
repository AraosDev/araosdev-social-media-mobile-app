import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ColorValue, GestureResponderEvent, TextProps, ViewStyle, TextInputProps } from "react-native";

type onPressForPressable = (event: GestureResponderEvent) => void;

export interface IconButtonProps {
    icon: Ionicons;
    onPress: onPressForPressable;
    color?: ColorValue;
    size?: number;
    style?: ViewStyle;
}

export interface GradientTextProps extends TextProps { }

export interface AppFormProps {
    label?: string;
    onChangeText?: TextInputProps['onChangeText'];
    value?: string;
    formStyle?: TextInputProps['style'];
    style?: ViewStyle;
    inputProps?: Omit<TextInputProps, 'onChangeText' | 'value' | 'style'>;
}

export interface AppButtonProps {
    theme?: 'outline' | 'default';
    onPress: onPressForPressable;
    children: TextProps['children'];
    innerWrapperStyle?: ViewStyle;
    outerWrapperStyle?: ViewStyle;
    icon?: MaterialIcons;
}