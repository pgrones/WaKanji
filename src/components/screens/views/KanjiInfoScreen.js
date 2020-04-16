import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {Icon} from 'react-native-elements';
import {getKanjiInfoById, setKanjiGotIt} from "../../../persistence/DbConnection";
import {setKanji, setKanjiInfo} from "../../../redux/actions/Actions";
import {connect} from "react-redux";

const KanjiInfoScreen = ({route, navigation, kanjiInfo, setKanjiInfo, setKanji}) => {
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
        setKanjiGotIt(info.id, info.gotIt, info.gradeId, setKanji);
    };

    return (
        kanjiInfo ?
            <View style={style.container}>
                <View style={style.kanjiContainer}>
                    <Text style={style.kanji}>{kanjiInfo.kanji}</Text>
                </View>
                <View style={style.translationContainer}>
                    <Text style={style.translation}>{kanjiInfo.translation}</Text>
                </View>
                <View style={style.readingContainer}>
                    <View style={{flexDirection: 'row', width: 90}}>
                        <Text style={style.translation}>Kun:</Text>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Icon
                                name={'question'}
                                size={font.regular}
                                type='simple-line-icon'
                                iconStyle={{marginBottom: -10, marginRight: 10}}
                                color={colors.primary}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={style.reading}>{kanjiInfo.kunReading}</Text>
                </View>
                <View style={style.readingContainer}>
                    <View style={{flexDirection: 'row', width: 90}}>
                        <Text style={style.translation}>On:</Text>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Icon
                                name={'question'}
                                size={font.regular}
                                type='simple-line-icon'
                                iconStyle={{marginBottom: -10, marginRight: 10}}
                                color={colors.primary}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={style.translation}>{kanjiInfo.onReading}</Text>
                </View>
                <TouchableOpacity style={style.button} activeOpacity={0.5}
                                  onPress={() => setGotIt(info.id, info.gotIt)}>
                    <Text style={style.buttonText}>Got it! 分かった!</Text>
                </TouchableOpacity>
            </View>
            : <></>
    )
};

const mapStateToProps = state => ({
    kanjiInfo: state.kanjiInfo
});

const mapDispatchToProps = (dispatch) => ({
    setKanji: (kanji) => dispatch(setKanji(kanji)),
    setKanjiInfo: (kanji) => dispatch(setKanjiInfo(kanji))
});

export default connect(mapStateToProps, mapDispatchToProps)(KanjiInfoScreen)

//export default KanjiInfoScreen;

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
        translationContainer:{
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
            alignItems: 'center',
            borderColor: colors.border,
            backgroundColor: colors.card,
            borderWidth: 2,
            borderRadius: 10,
            padding: 10
        },
        buttonText: {
            fontFamily: font.fontFamily,
            color: colors.primary,
            fontSize: font.large,
        }
    });
};
