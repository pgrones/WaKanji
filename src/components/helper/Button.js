import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import React from "react";
import {useTheme} from "@react-navigation/native";

/**
 * Customizable Button component that can be used everywhere
 * @param title Title displayed on the button. Can either be a string or a component
 * @param onPress Function to call when the button was pressed
 * @param icon The name of the icon to use on the right of the button e.g. chevron-right
 * @param type The type of the button e.g. ionicon, material-community, etc.
 * @param iconColor Color fo the icon. Default: text color
 * @param iconSize Size of the icon. Default: medium
 * @param rightMargin Margin on the right for additional alignment. Default: 12
 */
export const Button = ({title, onPress, icon, type, iconColor, iconSize, rightMargin = 12}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors, font, rightMargin);

    return (
        <TouchableOpacity style={style.button} activeOpacity={0.5} onPress={() => onPress()}>
            {React.isValidElement(title) ?
                title
                :
                <Text style={style.text}>{title}</Text>
            }
            {(icon !== undefined && type !== undefined) &&
            <Icon
                name={icon}
                size={iconSize || font.medium}
                type={type}
                color={iconColor || colors.text}
            />
            }
        </TouchableOpacity>
    )
};

const getStyle = (colors, font, rightMargin) => {
    return StyleSheet.create({
        button: {
            margin: 10,
            marginBottom: 0,
            marginRight: rightMargin,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            paddingBottom: 0,
            alignItems: 'center',
            minHeight: 40
        },
        text: {
            fontSize: font.regular,
            color: colors.text,
            fontFamily: font.fontFamily,
            fontWeight: 'bold'
        }
    });
};
