import React, {useEffect, useState} from 'react';
import ProgressBar from "../../../helper/ProgressBar";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {getRandomKanji} from "../../../../persistence/DbConnection";

const TimeBasedGame = ({next}) => {
    const [kanji, setKanji] = useState(false);
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    useEffect(() => {
        getRandomKanji([], setKanji);
    }, []);

    return (
        kanji ?
            <View style={{flex: 1}}>
                <ProgressBar duration={10000} onFinish={() => console.log('finish')}>
                    <Text style={style.scoreText}>0</Text>
                </ProgressBar>
                <View style={style.kanjiContainer}>
                    <Text style={style.kanji}>{kanji.kanji}</Text>
                </View>
                <View style={style.buttonContainer}>
                    <View style={style.row}>
                        <TouchableOpacity style={style.button} onPress={() => next()} activeOpacity={0.5}>
                            <Text style={style.buttonText}>{kanji.translation}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button} activeOpacity={0.5}>
                            <Text style={style.buttonText}>Gold</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.row}>
                        <TouchableOpacity style={style.button} activeOpacity={0.5}>
                            <Text style={style.buttonText}>Car</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button} activeOpacity={0.5}>
                            <Text style={style.buttonText}>House</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            : <View/>
    );
};

export default TimeBasedGame

const getStyle = (colors, font) => {
    return StyleSheet.create({
        kanjiContainer: {
            flex: 5,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: colors.border,
            backgroundColor: colors.card,
            borderWidth: 2,
            borderRadius: 10,
            margin: 10,
            marginTop: 5
        },
        kanji: {
            fontSize: 100,
            fontFamily: font.fontFamily,
            color: colors.text
        },
        buttonContainer: {
            flex: 10,
            margin: 5,
            marginBottom: 5,
        },
        row: {
            flex: 1,
            flexDirection: 'row',
            marginBottom: 5
        },
        button: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderRadius: 10,
            borderColor: colors.border,
            backgroundColor: colors.card,
            margin: 5,
            marginTop: 0
        },
        buttonText: {
            color: colors.primary,
            fontFamily: font.fontFamily,
            fontSize: font.large
        },
        scoreText: {
            color: colors.text,
            fontFamily: font.fontFamily,
            fontSize: font.regular
        }
    })
};
