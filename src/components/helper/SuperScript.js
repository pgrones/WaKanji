import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";

/**
 * A component to display raised characters e.g. "st" in 1st
 * @param start Start index of the characters to raise
 * @param end End index of the characters to raise
 * @param text The text which's are being raised
 */
export const SuperScript = ({start, end, text}) => {
    const {colors, font, smallScreen} = useTheme();
    const style = getStyle(colors, font, smallScreen);

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

const getStyle = (colors, font, smallScreen) => {
    return StyleSheet.create({
        regularText: {
            fontSize: smallScreen ? font.medium : font.large,
            fontFamily: font.fontFamily,
            lineHeight: smallScreen ? 30 : 40,
            color: colors.text,
            fontWeight: 'bold'
        },
        superScriptText: {
            fontSize: smallScreen ? font.regular : font.medium,
            fontFamily: font.fontFamily,
            lineHeight: smallScreen ? 18 : 24,
            color: colors.text,
            fontWeight: 'bold'
        }
    })
};
