import React, {useEffect, useState} from "react";
import {SectionList, StyleSheet, Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {connect} from "react-redux";
import {searchForExamples} from "../../../../api/jisho";
import {Furigana} from "../../../helper/Furigana";
import {LoadingScreen} from "../../../helper/LoadingScreen";
import {LinearGradient} from "expo-linear-gradient";

/**
 * Screen to display examples for each Kanji
 * Will eventually be merged with KanjiInfo
 * @param navigation
 * @param route
 * @param furigana Global boolean setting to display Furigana
 */
const ExamplesScreen = ({navigation, route, furigana}) => {
    const [examples, setExamples] = useState([]);
    const {kanji} = route.params;
    navigation.setOptions({title: kanji + '  Examples'});

    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    useEffect(() => {
        searchForExamples(kanji, getExamples);
    }, []);

    // Filter the needed data from the API
    const getExamples = (data) => {
        const arr = [];
        for (let ex of data) {
            arr.push({
                pieces: ex.pieces,
                sentence: ex.kanji,
                translation: ex.english
            })
        }
        setExamples([{
            title: 'Sentences',
            data: arr
        }]);
    }

    const ListItem = ({pieces, sentence, translation}) => {
        return (
            <View style={style.container}>
                {furigana === 'true' ?
                    <Furigana pieces={pieces} sentence={sentence}/>
                    :
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <Text style={style.ex}>{sentence}</Text>
                    </View>
                }
                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                    <Text style={style.ex}>{translation}</Text>
                </View>
            </View>
        )
    }

    return (
        <LinearGradient colors={[colors.backgroundLight, colors.backgroundDark]} style={{flex: 1}}>
            {examples.length ?
                <SectionList
                    sections={examples}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) =>
                        <ListItem pieces={item.pieces} sentence={item.sentence} translation={item.translation}/>
                    }
                    renderSectionHeader={({section: {title}}) =>
                        <View style={style.headerWrapper}>
                            <Text style={style.header}>{title}</Text>
                        </View>
                    }
                    stickySectionHeadersEnabled={true}
                />
                :
                <LoadingScreen text={'Fetching examples'}/>
            }
        </LinearGradient>
    )
};

const mapStateToProps = state => ({
    furigana: state.furigana
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
            padding: 10,
            marginBottom: 20,
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
            backgroundColor: colors.backgroundLight,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            padding: 10,
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
