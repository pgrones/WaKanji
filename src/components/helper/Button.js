import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import React from "react";
import {useTheme} from "@react-navigation/native";

export const Button = ({title, onPress, icon, type, color, fontSize, rightMargin = 12}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors, font, rightMargin);

    return (
        <TouchableOpacity style={style.button} activeOpacity={0.5} onPress={() => onPress()}>
            {React.isValidElement(title) ?
                title
                :
                <Text style={style.text}>{title}</Text>
            }
            {icon !== undefined &&
            <Icon
                name={icon}
                size={fontSize || font.medium}
                type={type}
                color={color || colors.text}
            />
            }
        </TouchableOpacity>
    )
};

const getStyle = (colors, font, rightMargin) => {
    return StyleSheet.create({
        button: {
            margin: 10,
            marginBottom: 5,
            marginRight: rightMargin,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            paddingBottom: 0,
            alignItems: 'center',
            minHeight: 37
        },
        text: {
            fontSize: font.regular,
            color: colors.text,
            fontFamily: font.fontFamily,
            fontWeight: 'bold'
        }
    });
};
