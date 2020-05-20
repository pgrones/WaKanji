import {StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {Icon} from "react-native-elements";
import React from "react";
import {useTheme} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import ExampleContainer from "./InfoContainer";
import {SVG} from "../../../helper/SVG";

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
    const height = useWindowDimensions().height;
    const {colors, font} = useTheme();
    const style = getStyle(colors, font, prev, next, height);

    const gotIt = () => {
        setGotIt(kanjiInfo.id, !kanjiInfo.gotIt, kanjiInfo.gradeId, index)
    };

    return (
        <LinearGradient colors={[colors.backgroundLight, colors.backgroundDark]} style={{flex: 1}}>
            <View style={style.wrapper}>
                <View style={style.kanjiContainer}>
                    {/*<Text style={style.kanji}>{kanjiInfo.kanji}</Text>*/}
                    <SVG ds={[
                        "M31.75,23.15c2.8,0.67,5.54,0.42,8.36,0.12c9.3-0.99,22.18-2.4,34.14-3.21c2.49-0.17,5.04-0.33,7.5,0.2",
                        "M55.75,25.25c0.62,1.25,1.02,3.01,0.5,5c-3.12,11.88-14,44.12-19.75,59",
                        "M25.5,55.25c2.07,1.24,4.73,1.03,7,0.81c15.49-1.45,29.89-3.03,42.25-4.06c3-0.25,4.25,1.75,3.5,3.75c-2.24,5.96-6,20.75-7.75,31.5",
                        "M11.25,90.5c3.04,0.81,6.52,0.63,9.63,0.41c15.71-1.1,43.9-2.8,67.75-3.8c3.41-0.14,6.9-0.4,10.25,0.39"
                    ]}/>
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
                    <TouchableOpacity activeOpacity={0.5}
                                      onPress={() => navigation.push('Examples', {kanji: kanjiInfo.kanji})}>
                        <Text style={style.buttonText}>Examples</Text>
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

const getStyle = (colors, font, prev, next, height) => {
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
        kanjiContainer: {
            height: height > 600 ? '40%' : '30%',
            alignSelf: 'center',
            aspectRatio: 1
        },
        buttonText: {
            fontFamily: font.fontFamily,
            color: colors.primary,
            fontSize: font.medium,
            fontWeight: 'bold',
        },
        swipeContainerWrapper: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 10,
            backgroundColor: colors.backgroundDark,
            borderRadius: 20
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


