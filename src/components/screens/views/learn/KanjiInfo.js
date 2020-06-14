import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import React, {useEffect, useState} from "react";
import {useTheme} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import InfoContainer from "./InfoContainer";
import {SVG} from "../../../helper/SVG";
import {getSvg} from "../../../../persistence/DbConnection";
import {LoadingScreen} from "../../../helper/LoadingScreen";
// import ActionButton from 'react-native-action-button';

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
    const [svg, setSvg] = useState();
    const {colors, font} = useTheme();
    const style = getStyle(colors, font, prev, next);

    useEffect(() => {
        // Using an anti-pattern to stop react from updating a state on an unmounted component
        // Not the best solution, but it does the job
        let isMounted = true;
        getSvg(kanjiInfo.id, (data) => {
            if (isMounted) {
                setSvg(data)
            }
        });

        return () => {
            isMounted = false;
        };
    }, [])

    const gotIt = () => {
        setGotIt(kanjiInfo.id, !kanjiInfo.gotIt, kanjiInfo.gradeId, index)
    };

    return (
        <LinearGradient colors={[colors.backgroundLight, colors.backgroundDark]} style={{flex: 1}}>
            <View style={style.wrapper}>
                <View style={style.kanjiContainer}>
                    {svg ?
                        <SVG ds={svg.paths.split(';')} strokeNumbers={svg.strokeNumbers.split(';')}/>
                        :
                        <LoadingScreen/>
                    }
                </View>
                <InfoContainer navigation={navigation} kanjiInfo={kanjiInfo}/>
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
                        <Text style={style.swipeTextPrev}>{prev ? prev : '一'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}
                                      onPress={() => navigation.push('Examples', {kanji: kanjiInfo.kanji})}>
                        <Text style={style.buttonText}>Examples</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!next} activeOpacity={0.5} style={{flexDirection: 'row'}}
                                      onPress={() => scrollBy(1)}>
                        <Text style={style.swipeTextNext}>{next ? next : '一'}</Text>
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
            <TouchableOpacity onPress={() => gotIt()} activeOpacity={0.5} style={style.toggleButton}>
                {kanjiInfo.gotIt === 1 ?
                    <Icon name={'ios-checkmark-circle'} type={'ionicon'} color={colors.primary} size={50}/>
                    :
                    <Icon name={'ios-close-circle'} type={'ionicon'} color={colors.primary} size={50}/>
                }
            </TouchableOpacity>
            {/*// TODO actually do something with the action button */}
            {/*<ActionButton*/}
            {/*    buttonColor="rgba(0,0,0, 0)"*/}
            {/*    verticalOrientation={'down'}*/}
            {/*    offsetY={0} offsetX={10}*/}
            {/*    hideShadow={true}*/}
            {/*    useNativeFeedback={false}*/}
            {/*    renderIcon={() => kanjiInfo.gotIt === 1 ?*/}
            {/*        <Icon name={'ios-checkmark-circle'} type={'ionicon'} color={colors.primary} size={50}/>*/}
            {/*        :*/}
            {/*        <Icon name={'ios-close-circle'} type={'ionicon'} color={colors.primary} size={50}/>*/}
            {/*    }*/}
            {/*    onPress={() => gotIt()}*/}
            {/*/>*/}
        </LinearGradient>
    )
};

const getStyle = (colors, font, prev, next) => {
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
            height: '40%',
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
        },
        toggleButton: {
            position: 'absolute',
            top: 0,
            right: 15
        }
    });
};


