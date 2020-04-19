import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {convert} from "../../../helper/ReadingConverter";
import {Overlay} from "../../../helper/Overlay";
import React, {useState} from "react";
import {useTheme} from "@react-navigation/native";
import {connect} from "react-redux";

const KanjiInfo = ({onyomi, kunyomi, kanjiInfo, prev, next, setGotIt}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [reading, setReading] = useState();

    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    const openModal = (reading) => {
        setReading(reading);
        setModalVisible(true)
    };

    const gotIt = () => {
        setGotIt(kanjiInfo.id, !kanjiInfo.gotIt, kanjiInfo.gradeId)
    };

    return (
        <ScrollView contentContainerStyle={style.wrapper} bounces={false}>
            <View style={style.kanjiContainer}>
                <Text style={style.kanji}>{kanjiInfo.kanji}</Text>
                {kanjiInfo.gotIt ?
                    <View style={style.gotItIcon}>
                        <Icon
                            name={'ios-checkmark-circle'}
                            size={font.large}
                            type='ionicon'
                            color={colors.primary}
                            containerStyle={{backgroundColor: 'transparent'}}
                        />
                    </View>
                    : <></>
                }
            </View>
            <View style={style.translationContainer}>
                <Text style={style.translation}>{kanjiInfo.translation}</Text>
            </View>
            <View style={style.readingContainer}>
                <View style={{flexDirection: 'row', width: 90}}>
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
                <View style={{flexDirection: 'row', width: 90}}>
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
            <TouchableOpacity style={style.button} activeOpacity={0.5}
                              onPress={() => gotIt()}>
                <Text style={style.buttonText}>{!kanjiInfo.gotIt ? 'Got it! 分かった!' : "Didn't get it yet!"}</Text>
            </TouchableOpacity>
            <View style={style.swipeContainerWrapper}>
                <View style={style.swipeContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <Icon
                            name={'chevron-left'}
                            size={font.large}
                            type='material-community'
                            color={colors.primary}
                        />
                        <Text style={style.swipeText}>{prev}</Text>
                    </View>
                    <Text style={style.swipeText}>Swipe</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={style.swipeText}>{next}</Text>
                        <Icon
                            name={'chevron-right'}
                            size={font.large}
                            type='material-community'
                            color={colors.primary}
                        />
                    </View>
                </View>
            </View>

            <Overlay isVisible={modalVisible} setVisible={setModalVisible} content={reading}/>
        </ScrollView>
    )
};

const mapStateToProps = state => ({
    kunyomi: state.kunyomi,
    onyomi: state.onyomi
});

export default connect(mapStateToProps,)(KanjiInfo)

const getStyle = (colors, font) => {
    const container = {
        alignSelf: 'stretch',
        alignItems: 'center',
        borderColor: colors.border,
        backgroundColor: colors.card,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
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
            fontSize: 140,
            lineHeight: 170
        },
        kanjiContainer: {
            ...container
        },
        translationContainer: {
            ...container
        },
        translation: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: font.large
        },
        readingContainer: {
            flexDirection: 'row',
            ...container
        },
        reading: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: font.large,
            flex: 1,
            flexWrap: 'wrap'
        },
        button: {
            backgroundColor: colors.primary,
            borderRadius: 35,
            padding: 10,
            alignSelf: 'stretch',
            alignItems: 'center',
        },
        buttonText: {
            fontFamily: font.fontFamily,
            color: colors.buttonText,
            fontSize: font.large,
        },
        gotItIcon: {
            position: 'absolute',
            bottom: 0,
            right: 5
        },
        swipeContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'stretch',
        },
        swipeContainerWrapper: {
            flex: 1,
            justifyContent: 'flex-end',
            alignSelf: 'stretch'
        },
        swipeText: {
            fontFamily: font.fontFamily,
            color: colors.primary,
            fontSize: font.regular,
            alignSelf: 'center',
            paddingBottom: 2
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
