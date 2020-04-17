import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import React from "react";
import {useTheme} from "@react-navigation/native";

export const SettingButton = ({title, onPress}) =>{
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    return(
        <TouchableOpacity style={style.button} activeOpacity={0.5} onPress={() => onPress()}>
            <Text style={style.text}>{title}</Text>
            <Icon
                name={'chevron-right'}
                size={font.large}
                type='material-community'
                color={colors.text}
            />
        </TouchableOpacity>
    )
};

const getStyle = (colors, font) => {
    return StyleSheet.create({
        button: {
            margin: 10,
            marginBottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            alignItems: 'center',
            backgroundColor: colors.card,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.border
        },
        text:{
            fontSize: font.regular,
            color: colors.text,
            fontWeight: 'bold'
        }
    });
};
