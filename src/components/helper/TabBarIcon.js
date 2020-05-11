import React from "react";
import {Text} from "react-native";
import {font} from "./Theme";

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
