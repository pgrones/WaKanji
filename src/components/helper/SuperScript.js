import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";

export const SuperScript = ({start, end, text}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    const firstPart = text.slice(0, start);
    const superScript = text.slice(start, end);
    const lastPart = text.slice(end, text.length);

    return (
        <View style={{flexDirection: 'row'}}>
            <Text style={style.regularText}>{firstPart}</Text>
            <Text style={style.superScriptText}>{superScript}</Text>
            <Text style={style.regularText}>{lastPart}</Text>
        </View>
    )
};

const getStyle = (colors, font) => {
    return StyleSheet.create({
        regularText: {
            fontSize: font.regular,
            fontFamily: font.fontFamily,
            lineHeight: 30,
            color: colors.text,
            fontWeight: 'bold'
        },
        superScriptText: {
            fontSize: 14,
            fontFamily: font.fontFamily,
            lineHeight: 18,
            color: colors.text,
            fontWeight: 'bold'
        }
    })
};
