import React, {useEffect, useState} from "react";
import {SectionList, StyleSheet, Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {connect} from "react-redux";
import {searchForExamples} from "../../../../api/jisho";

const ExamplesScreen = ({route}) => {
    const [examples, setExamples] = useState([]);
    const {kanji} = route.params;

    const {colors, font} = useTheme();
    const style = getStyle(colors, font,);

    useEffect(() => {
        searchForExamples(kanji).then(result => {
            getExamples(result.results)
        })
    }, []);

    const getExamples = (data) => {
        const arr = [];
        for (let ex of data) {
            if (ex.kanji.length < 22) {
                arr.push({
                    sentence: ex.kanji,
                    sentenceInHiragana: ex.kana,
                    translation: ex.english
                })
            }
        }
        setExamples([{
            title: 'Sentences',
            data: arr
        }]);
    }

    const ListItem = ({sentence, sentenceInHiragana, translation}) => {
        return (
            <View style={style.container}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Text style={style.ex}>{sentence}</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Text style={style.ex}>{sentenceInHiragana}</Text>
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                    <Text style={style.ex}>{translation}</Text>
                </View>
            </View>
        )
    }

    return (
        examples.length ?
            <View style={{flex: 1, margin: 10}}>
                <SectionList
                    sections={examples}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) =>
                        <ListItem
                            sentence={item.sentence}
                            sentenceInHiragana={item.sentenceInHiragana}
                            translation={item.translation}
                        />
                    }
                    renderSectionHeader={({section: {title}}) =>
                        <View style={style.headerWrapper}>
                            <View style={style.container}>
                                <Text style={style.header}>{title}</Text>
                            </View>
                        </View>
                    }
                    stickySectionHeadersEnabled={true}
                />
            </View>
            :
            <Text style={[style.ex, {textAlign: 'center'}]}>Fetching examples</Text> //TODO add loading bar
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
            ...example
        },
        ex: {
            ...example,
            flex: 1,
            flexWrap: 'wrap'
        },
        headerWrapper: {
            backgroundColor: colors.background
        },
        header: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold'
        }
    })
};
