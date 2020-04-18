import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {Icon} from 'react-native-elements';
import {getKanjiInfoById, setKanjiGotIt} from "../../../../persistence/DbConnection";
import {setKanji, setKanjiInfo} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";
import {convert} from "../../../helper/ReadingConverter";
import {Overlay} from "../../../helper/Overlay";

const KanjiInfoScreen = ({route, navigation, kanjiInfo, kunyomi, onyomi, setKanjiInfo, setKanji}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [reading, setReading] = useState();
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);
    navigation.setOptions({title: route.params.header});
    const info = route.params.info;

    useEffect(() => {
        if (!kanjiInfo || info.id !== kanjiInfo.id) {
            getKanjiInfoById(info.id, setKanjiInfo);
        }
    }, []);

    const setGotIt = () => {
        setKanjiInfo({...kanjiInfo, gotIt: !kanjiInfo.gotIt});
        setKanjiGotIt(info.id, !kanjiInfo.gotIt, info.gradeId, setKanji);
    };

    const openModal = (reading) =>{
        setReading(reading);
        setModalVisible(true)
    };

    return (
        kanjiInfo &&
        <View style={style.container}>
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
                              onPress={() => setGotIt(info.id, info.gotIt)}>
                <Text style={style.buttonText}>{!kanjiInfo.gotIt ? 'Got it! 分かった!' : "Study some more?"}</Text>
            </TouchableOpacity>

            <Overlay isVisible={modalVisible} setVisible={setModalVisible} content={reading}/>
        </View>
    )
};

const mapStateToProps = state => ({
    kanjiInfo: state.kanjiInfo,
    kunyomi: state.kunyomi,
    onyomi: state.onyomi
});

const mapDispatchToProps = (dispatch) => ({
    setKanji: (kanji) => dispatch(setKanji(kanji)),
    setKanjiInfo: (kanji) => dispatch(setKanjiInfo(kanji))
});

export default connect(mapStateToProps, mapDispatchToProps)(KanjiInfoScreen)

const getStyle = (colors, font) => {
    return StyleSheet.create({
        container: {
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
            alignSelf: 'stretch',
            alignItems: 'center',
            borderColor: colors.border,
            backgroundColor: colors.card,
            borderWidth: 2,
            borderRadius: 10,
            marginBottom: 10
        },
        translationContainer: {
            alignSelf: 'stretch',
            alignItems: 'center',
            borderColor: colors.border,
            backgroundColor: colors.card,
            borderWidth: 2,
            borderRadius: 10,
            padding: 10,
            marginBottom: 10
        },
        translation: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: font.large
        },
        readingContainer: {
            flexDirection: 'row',
            alignSelf: 'stretch',
            borderColor: colors.border,
            backgroundColor: colors.card,
            borderWidth: 2,
            borderRadius: 10,
            padding: 10,
            marginBottom: 10
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
