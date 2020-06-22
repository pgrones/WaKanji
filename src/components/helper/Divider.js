import React from "react";
import {View} from "react-native";

export const Divider = ({color, margin}) => {
    return (
        <View style={{
            alignSelf: "stretch",
            backgroundColor: color,
            height: 3,
            marginHorizontal: margin,
            borderRadius: 10
        }}/>
    )
}
