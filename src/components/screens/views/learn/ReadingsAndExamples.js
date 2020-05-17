import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {Icon} from "react-native-elements";
import {convert} from "../../../helper/ReadingConverter";
import {useTheme} from "@react-navigation/native";
import {connect} from "react-redux";
import {Overlay} from "../../../helper/Overlay";
import {LinearGradient} from "expo-linear-gradient";
import {Button} from "../../../helper/Button";
import ExamplesScreen from "./ExamplesScreen";

const ExampleContainer = ({navigation, onyomi, kunyomi, kanjiInfo}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [reading, setReading] = useState();

    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    const height = useWindowDimensions().height;

    const openModal = (reading) => {
        setReading(reading);
        setModalVisible(true)
    };

    return (
        <LinearGradient colors={[colors.backgroundLight, colors.backgroundDark]} style={style.wrapper}>
            <Overlay isVisible={modalVisible} setVisible={setModalVisible} content={reading}/>
            <View style={style.readingContainer}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={style.translation}>Kunyomi</Text>
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
                        <Text style={style.translation}>Onyomi</Text>
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
            {height < 600 ?
                <View style={{flex: 1, justifyContent: 'center', marginBottom: 35}}>
                    <Button
                        title={'Example Sentences'}
                        onPress={() => navigation.push('Examples', {kanji: kanjiInfo.kanji})}
                        icon={'chevron-right'}
                        iconSize={font.large}
                        type={'material-community'}
                    />
                </View>
                :
                <ExamplesScreen navigation={navigation} kanji={kanjiInfo.kanji}/>
            }
        </LinearGradient>
    )
}

const mapStateToProps = state => ({
    kunyomi: state.kunyomi,
    onyomi: state.onyomi
});

export default connect(mapStateToProps)(ExampleContainer);

const getStyle = (colors, font) => {
    return StyleSheet.create({
        wrapper: {
            flex: 1,
            alignSelf: 'stretch',
            padding: 0,
            borderRadius: 30,
        },
        translation: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: font.regular,
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
            fontSize: font.regular,
            flexWrap: 'wrap',
            textAlign: 'center',
            margin: 10,
            marginBottom: 0,
            marginTop: 5,
            paddingRight: 20
        },
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
