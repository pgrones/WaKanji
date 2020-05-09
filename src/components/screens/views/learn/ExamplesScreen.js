import React, {useEffect, useState} from "react";
import {SectionList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getKanjiExamplesById} from "../../../../persistence/DbConnection";
import {useTheme} from "@react-navigation/native";
import {connect} from "react-redux";
import {convert, isHiragana} from "../../../helper/ReadingConverter";
import {Icon} from "react-native-elements";

const ExamplesScreen = ({navigation, route, kunyomi, onyomi}) => {
    const [examples, setExamples] = useState([]);
    const {kanjiId} = route.params;

    const {colors, font} = useTheme();
    const style = getStyle(colors, font,);

    useEffect(() => {
        getKanjiExamplesById(kanjiId, getExamples);
    }, []);

    const getExamples = (data) => {
        const arr = [];
        for (let ex of data) {
            arr.push({
                reading: ex.reading,
                data: [ex]
            })
        }
        setExamples(arr);
    }

    const ListItem = ({sentence, sentenceInHiragana, translation}) => {
        return (
            <View style={style.container}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Text style={style.exHeader}>Ex: </Text>
                    <Text style={style.ex}>{sentence}</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Text style={style.exHeader}>Kana: </Text>
                    <Text style={style.ex}>{sentenceInHiragana}</Text>
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                    <Text style={style.exHeader}>Tl: </Text>
                    <Text style={style.ex}>{translation}</Text>
                </View>
            </View>
        )
    }

    return (
        examples.length ?
            <View style={{flex: 1, margin: 10, marginTop: 0, marginBottom: 0}}>
                <SectionList
                    sections={examples}
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) =>
                        <ListItem
                            sentence={item.sentence}
                            sentenceInHiragana={item.sentenceInHiragana}
                            translation={item.translation}
                        />
                    }
                    renderSectionHeader={({section: {reading}}) =>
                        <Text style={style.header}>
                            Reading: {isHiragana(reading) ? convert(reading, kunyomi) : convert(reading, onyomi)}
                        </Text>
                    }
                    bounces={false}
                    stickySectionHeadersEnabled={false}
                />
                <TouchableOpacity style={style.button} activeOpacity={0.5} onPress={() => {
                    navigation.navigate('Settings'); //TODO actually link up to report
                }}>
                    <Text style={style.exHeader}>Typos or mistakes? Report the issue</Text>
                    <Icon
                        name={'external-link'}
                        size={font.large}
                        type={'feather'}
                        color={colors.text}
                    />
                </TouchableOpacity>
            </View>
            :
            <Text style={[style.ex, {textAlign: 'center'}]}>No examples available yet</Text>
    )
};

const mapStateToProps = state => ({
    kunyomi: state.kunyomi,
    onyomi: state.onyomi
});

export default connect(mapStateToProps)(ExamplesScreen)

const getStyle = (colors, font) => {
    const example = {
        fontFamily: font.fontFamily,
        color: colors.text,
        fontSize: font.regular,
        flexWrap: 'wrap'
    };

    return StyleSheet.create({
        container: {
            alignSelf: 'stretch',
            justifyContent: 'flex-start',
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 2,
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
        },
        exHeader: {
            ...example,
            minWidth: 55
        },
        ex: {
            ...example,
            flex: 1,
            flexWrap: 'wrap'
        },
        header: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 5,
            marginBottom: 5
        },
        button: {
            alignSelf: 'stretch',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 2,
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
        }
    })
};
