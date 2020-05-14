import React from "react";
import {Text} from "react-native";
import {font} from "./Theme";

/**
 * The icon used in the tab bar
 * @param iconText Text to use as icon (Kanji in this case)
 * @param color The color of the icon
 */
export const TabBarIcon = ({iconText, color}) => {
    return (
        <Text style={{
            fontSize: 18,
            fontFamily: font.fontFamily,
            color: color
        }}>
            {iconText}
        </Text>
    )
};

/**
 * The text below the icon used in the tab bar
 * @param text Text to use below the icon
 * @param color The color of the text
 */
export const TabBarText = ({text, color}) => {
    return (
        <Text style={{
            color: color,
            fontSize: 12,
            marginBottom: 5
        }}>
            {text}
        </Text>
    )
}
