import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import React from "react";
import {useTheme} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import ExampleContainer from "./ReadingsAndExamples";

/**
 * Component displaying all infos regarding a Kanji
 * This component will receive major changes to decrease its size/complexity and to incorporate examples
 * @param navigation
 * @param kanjiInfo All info regarding a Kanji
 * @param prev Previous Kanji to display as the previous button
 * @param next Next Kanji to display as the next button
 * @param setGotIt Function to mark a Kanji as understood
 * @param scrollBy Scroll by one to the next/previous Kanji
 * @param index The index of the current Kanji in the global array
 */
export const KanjiInfo = ({navigation, kanjiInfo, prev, next, setGotIt, scrollBy, index}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors, font, prev, next);

    const gotIt = () => {
        setGotIt(kanjiInfo.id, !kanjiInfo.gotIt, kanjiInfo.gradeId, index)
    };

    return (
        <LinearGradient colors={[colors.backgroundLight, colors.backgroundDark]} style={{flex: 1}}>
            <View style={style.wrapper}>
                <View style={style.kanjiContainer}>
                    <Text style={style.kanji}>{kanjiInfo.kanji}</Text>
                </View>
                <View style={style.translationContainer}>
                    <Text style={style.translation}>{kanjiInfo.translation}</Text>
                </View>
                <ExampleContainer navigation={navigation} kanjiInfo={kanjiInfo}/>
            </View>
            <View style={style.swipeContainerWrapper}>
                <View style={style.swipeContainer}>
                    <TouchableOpacity disabled={!prev} activeOpacity={0.5} style={{flexDirection: 'row'}}
                                      onPress={() => scrollBy(-1)}>
                        <Icon
                            name={'chevron-left'}
                            size={font.medium}
                            type='material-community'
                            color={prev ? colors.primary : 'transparent'}
                            containerStyle={{marginTop: 5}}
                        />
                        <Text style={style.swipeTextPrev}>{prev}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!next} activeOpacity={0.5} style={{flexDirection: 'row'}}
                                      onPress={() => scrollBy(1)}>
                        <Text style={style.swipeTextNext}>{next}</Text>
                        <Icon
                            name={'chevron-right'}
                            size={font.medium}
                            type='material-community'
                            color={next ? colors.primary : 'transparent'}
                            containerStyle={{marginTop: 5}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
};

const getStyle = (colors, font, prev, next) => {
    const container = {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10
    };

    const swipeText = {
        fontFamily: font.fontFamily,
        color: colors.primary,
        fontSize: font.regular,
        alignSelf: 'center',
        paddingBottom: 5,
        paddingTop: 5,
    };

    return StyleSheet.create({
        wrapper: {
            flex: 1,
            alignItems: 'center',
            margin: 0
        },
        kanji: {
            fontFamily: 'KanjiStrokeFont',
            color: colors.text,
            fontSize: 120
        },
        kanjiContainer: {
            alignSelf: 'stretch',
            alignItems: 'center'
        },
        translationContainer: {
            ...container,
            paddingTop: 0
        },
        translation: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: font.medium,
            fontWeight: 'bold'
        },
        swipeContainerWrapper: {
            position: 'absolute',
            bottom: 0,
            left: 10,
            right: 10
        },
        swipeContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'stretch',
            backgroundColor: 'transparent'
        },
        swipeTextPrev: {
            ...swipeText,
            color: prev ? colors.primary : 'transparent'
        },
        swipeTextNext: {
            ...swipeText,
            color: next ? colors.primary : 'transparent'
        }
    });
};


