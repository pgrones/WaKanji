import {StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {Icon} from "react-native-elements";
import React, {useEffect, useState} from "react";
import {useTheme} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import InfoContainer from "./InfoContainer";
import SVG from "../../../helper/SVG";
import {getSvg} from "../../../../persistence/DbConnection";
import {LoadingScreen} from "../../../helper/LoadingScreen";
import ActionButton from "../../../../actionbutton/ActionButton";
import {connect} from "react-redux";

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
export const KanjiInfo = ({navigation, kanjiInfo, prev, next, setGotIt, scrollBy, index, skipAnimations}) => {
    const [svg, setSvg] = useState();
    const [skip, setSkip] = useState(false)
    const {colors, font} = useTheme();
    const style = getStyle(colors, font, prev, next);
    const height = useWindowDimensions().height;

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
                        <SVG ds={svg.paths.split(';')} strokeNumbers={svg.strokeNumbers.split(';')} skip={skip}
                             setSkip={setSkip}/>
                        :
                        <LoadingScreen/>
                    }
                </View>
                {skipAnimations === 'false' && !skip &&
                <TouchableOpacity style={style.skipButton} onPress={() => setSkip(true)}>
                    <Icon
                        name={'ios-skip-forward'}
                        size={font.medium}
                        type='ionicon'
                        color={colors.buttonText}
                        containerStyle={{marginTop: 10}}
                    />
                </TouchableOpacity>
                }
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
            <ActionButton
                buttonColor={height > 600 ? colors.primary : colors.primaryRGBA}
                bgOpacity={0.5}
                verticalOrientation={'up'}
                offsetY={60} offsetX={15} size={60}
                hideShadow={true}
                autoInactive={false}
                useNativeFeedback={false}
                renderIcon={() => <Icon name={'ios-add'} type={'ionicon'} color={colors.buttonText} size={60}/>}
            >
                <ActionButton.Item buttonColor={colors.backgroundDark} textContainerStyle={style.actionItemContainer}
                                   textStyle={style.actionItemIcon} title="Examples"
                                   onPress={() => navigation.push('Examples', {kanji: kanjiInfo.kanji})}>
                    <Icon name={'md-text'} type={'ionicon'} color={colors.text} size={40}
                          containerStyle={{marginTop: 5}}/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor={colors.backgroundDark} textContainerStyle={style.actionItemContainer}
                                   textStyle={style.actionItemIcon}
                                   title={kanjiInfo.gotIt === 1 ? 'Remove from library' : "Add to library"}
                                   onPress={() => gotIt()}>
                    <Icon name={kanjiInfo.gotIt === 1 ? 'ios-close' : 'ios-checkmark'} type={'ionicon'}
                          color={colors.text} size={60}/>
                </ActionButton.Item>
            </ActionButton>
        </LinearGradient>
    )
};

const mapStateToProps = state => ({
    skipAnimations: state.skipAnimations
});

export default connect(mapStateToProps)(KanjiInfo);

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
        skipButton: {
            borderRadius: 50,
            width: 45,
            aspectRatio: 1,
            position: 'absolute',
            top: 0,
            right: 15,
            backgroundColor: colors.primary
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
            padding: 10
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
        actionItemContainer: {
            backgroundColor: colors.backgroundDark,
            borderWidth: 0,
            height: 32
        },
        actionItemIcon: {
            color: colors.text,
            fontFamily: font.fontFamily,
            fontSize: font.regular,
            textAlign: 'center'
        }
    });
};


