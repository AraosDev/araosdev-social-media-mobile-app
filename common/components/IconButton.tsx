import { Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { IconButtonProps } from '../../@types/common';

function IconButton(props: IconButtonProps): React.ReactElement {
    const { icon, onPress, color, size = 24, style = {} } = props;
    return (
        <Pressable onPress={onPress} style={({ pressed }) => pressed ? { opacity: 0.7, ...style } : style}>
            <Ionicons name={icon} color={color} size={size} />
        </Pressable>
    );
}

export default IconButton;