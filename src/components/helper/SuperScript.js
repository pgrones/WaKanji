import React from "react";
import {Platform, StyleSheet, Text, View} from "react-native";

export const SuperScript = (props) => {
    let firstPart = props.text.slice(0, props.start);
    let superScript = props.text.slice(props.start, props.end);
    let lastPart = props.text.slice(props.end, props.text.length);

    return (
        <View style={{flexDirection: 'row'}}>
            <Text style={style.item}>{firstPart}</Text>
            <Text style={style.superScripItem}>{superScript}</Text>
            <Text style={style.item}>{lastPart}</Text>
        </View>
    )
};

const style = StyleSheet.create({
    item: {
        fontFamily: Platform.OS === 'ios' ? 'PingFangSC-Regular' : '',
        fontSize: 18,
        lineHeight: 30
    },
    superScripItem:{
        fontFamily: Platform.OS === 'ios' ? 'PingFangSC-Regular' : '',
        fontSize: 14,
        lineHeight: 18
    }
});
