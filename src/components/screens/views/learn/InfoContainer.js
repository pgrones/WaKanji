import React, {useState} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {convert} from "../../../helper/ReadingConverter";
import {useTheme} from "@react-navigation/native";
import {connect} from "react-redux";
import {Overlay} from "../../../helper/Overlay";
import {LinearGradient} from "expo-linear-gradient";

const InfoContainer = ({navigation, onyomi, kunyomi, kanjiInfo}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [reading, setReading] = useState();

    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    const openModal = (reading) => {
        setReading(reading);
        setModalVisible(true)
    };

    return (
        <LinearGradient colors={[colors.backgroundLight, colors.backgroundDark]} style={style.wrapper}>
            <Overlay isVisible={modalVisible} setVisible={setModalVisible} content={reading}/>
            <View style={style.translationContainer}>
                <Text style={style.translation}>{kanjiInfo.translation}</Text>
            </View>
            <ScrollView contentContainerStyle={{paddingBottom: 35}} bounces={false}>
                <View style={style.readingContainer}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={style.text}>Kunyomi</Text>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => openModal(kunExplanation)}>
                                <Icon
                                    name={'question'}
                                    size={font.regular}
                                    type={'simple-line-icon'}
                                    iconStyle={{marginTop: -5, marginLeft: 5}}
                                    color={colors.primary}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={style.reading}>{convert(kanjiInfo.kunReading, kunyomi)}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={style.text}>Onyomi</Text>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => openModal(onExplanation)}>
                                <Icon
                                    name={'question'}
                                    size={font.regular}
                                    type={'simple-line-icon'}
                                    iconStyle={{marginTop: -5, marginLeft: 5}}
                                    color={colors.primary}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={style.reading}>{convert(kanjiInfo.onReading, onyomi)}</Text>
                    </View>
                </View>
                <View style={style.buttonContainer}>
                    <TouchableOpacity activeOpacity={0.5}
                                      onPress={() => navigation.push('Examples', {kanji: kanjiInfo.kanji})}>
                        <Text style={[style.text, {color: colors.primary}]}>Examples</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

const mapStateToProps = state => ({
    kunyomi: state.kunyomi,
    onyomi: state.onyomi
});

export default connect(mapStateToProps)(InfoContainer);

const getStyle = (colors, font) => {
    return StyleSheet.create({
        wrapper: {
            flex: 1,
            alignSelf: 'stretch',
            padding: 0,
            marginTop: 30,
            borderRadius: 30,
        },
        translationContainer: {
            alignSelf: 'stretch',
            alignItems: 'center',
            margin: 20
        },
        translation: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: font.large,
            fontWeight: 'bold'
        },
        text: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: font.medium,
            fontWeight: 'bold',
        },
        readingContainer: {
            flexDirection: 'row',
            alignContent: 'stretch',
            alignItems: 'flex-start',
            margin: 10,
            marginTop: 15,
            marginBottom: 0,
        },
        reading: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: font.medium,
            flexWrap: 'wrap',
            textAlign: 'center',
            margin: 10,
            marginBottom: 0,
            marginTop: 5,
            paddingRight: 0
        },
        buttonContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30
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
