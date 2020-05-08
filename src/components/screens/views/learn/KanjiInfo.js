import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {convert} from "../../../helper/ReadingConverter";
import {Overlay} from "../../../helper/Overlay";
import React, {useState} from "react";
import {useTheme} from "@react-navigation/native";
import {connect} from "react-redux";

const KanjiInfo = ({onyomi, kunyomi, kanjiInfo, prev, next, setGotIt, scrollBy, index}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [reading, setReading] = useState();

    const {colors, font} = useTheme();
    const style = getStyle(colors, font, prev, next);

    const openModal = (reading) => {
        setReading(reading);
        setModalVisible(true)
    };

    const gotIt = () => {
        setGotIt(kanjiInfo.id, !kanjiInfo.gotIt, kanjiInfo.gradeId, index)
    };

    return (
        // Would like to have a scroll view here, but it just doesn't scroll
        <View style={style.wrapper}>
            <Overlay isVisible={modalVisible} setVisible={setModalVisible} content={reading}/>
            <TouchableOpacity style={style.kanjiContainer} activeOpacity={0.5} onPress={() => gotIt()}>
                <Text style={style.kanji}>{kanjiInfo.kanji}</Text>
                {kanjiInfo.gotIt ?
                    <View style={style.gotItIcon}>
                        <Icon
                            name={'ios-checkmark-circle'}
                            size={font.medium}
                            type='ionicon'
                            color={colors.primary}
                            containerStyle={{backgroundColor: 'transparent'}}
                        />
                    </View>
                    :
                    <View style={style.gotItIconPlaceHolder}/>
                }
            </TouchableOpacity>
            <View style={style.translationContainer}>
                <Text style={style.translation}>{kanjiInfo.translation}</Text>
            </View>
            <View style={style.readingContainer}>
                <View style={{flexDirection: 'row', height: '100%', width: 90}}>
                    <Text style={style.translation}>Kun:</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => openModal(kunExplanation)}>
                        <Icon
                            name={'question'}
                            size={font.regular}
                            type='simple-line-icon'
                            iconStyle={{marginBottom: -10, marginRight: 10}}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={style.reading}>{convert(kanjiInfo.kunReading, kunyomi)}</Text>
            </View>
            <View style={style.readingContainer}>
                <View style={{flexDirection: 'row', height: '100%', width: 90}}>
                    <Text style={style.translation}>On:</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => openModal(onExplanation)}>
                        <Icon
                            name={'question'}
                            size={font.regular}
                            type='simple-line-icon'
                            iconStyle={{marginBottom: -10, marginRight: 10}}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={style.translation}>{convert(kanjiInfo.onReading, onyomi)}</Text>
            </View>
            <TouchableOpacity style={style.exampleContainer} activeOpacity={0.5}>
                <Text style={style.example}>Example Sentences</Text>
                <Icon
                    name={'chevron-right'}
                    size={font.large}
                    type='material-community'
                    color={colors.text}
                />
            </TouchableOpacity>
            <View style={style.swipeContainerWrapper}>
                <View style={style.swipeContainer}>
                    <TouchableOpacity disabled={!prev} activeOpacity={0.5} style={{flexDirection: 'row'}}
                                      onPress={() => scrollBy(-1)}>
                        <Icon
                            name={'chevron-left'}
                            size={font.medium}
                            type='material-community'
                            color={prev ? colors.primary : colors.background}
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
                            color={next ? colors.primary : colors.background}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const mapStateToProps = state => ({
    kunyomi: state.kunyomi,
    onyomi: state.onyomi
});

export default connect(mapStateToProps,)(KanjiInfo)

const getStyle = (colors, font, prev, next) => {
    const container = {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
    };

    const swipeText = {
        fontFamily: font.fontFamily,
        color: colors.primary,
        fontSize: font.regular,
        alignSelf: 'center',
        paddingBottom: 2
    };

    return StyleSheet.create({
        wrapper: {
            flex: 1,
            alignItems: 'center',
            margin: 10
        },
        kanji: {
            fontFamily: 'KanjiStrokeFont',
            color: colors.text,
            fontSize: 120
        },
        kanjiContainer: {
            ...container,
            padding: 0
        },
        translationContainer: {
            ...container
        },
        translation: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: font.medium
        },
        readingContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            ...container
        },
        reading: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: font.medium,
            flex: 1,
            flexWrap: 'wrap'
        },
        exampleContainer: {
            ...container,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        example: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: font.medium,
        },
        gotItIcon: {
            position: 'absolute',
            bottom: 3,
            right: 5
        },
        gotItIconPlaceHolder: {
            position: 'absolute',
            bottom: 5,
            right: 5,
            height: 21,
            width: 21,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 50
        },
        swipeContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'stretch',
            backgroundColor: colors.background
        },
        swipeContainerWrapper: {
            flex: 1,
            justifyContent: 'flex-end',
            alignSelf: 'stretch'
        },
        swipeTextPrev: {
            ...swipeText,
            color: prev ? colors.primary : colors.background
        },
        swipeTextNext: {
            ...swipeText,
            color: next ? colors.primary : colors.background
        }
    });
};

const kunExplanation = 'Kunyomi, Kun-reading or simply Kun is the Japanese reading of a Kanji. ' +
    'It is usually unique to the Japanese language. \n\nMost dictionaries use hiragana to depict these readings. ' +
    'Head to settings to use different characters like katakana or romaji.';

const onExplanation = 'Onyomi, On-reading or simply On is the Chinese reading of a Kanji. ' +
    'If you ever study Chinese you will notice the similarities in the way Kanji are read in both languages. ' +
    'Sometimes the Onyomi of a Kanji sounds nothing like it does in Chinese though. ' +
    '\n\nMost dictionaries use katakana to depict these readings. ' +
    'Head to settings to use different characters like hiragana or romaji.';
