import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
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
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    useEffect(() => {
        navigation.setOptions({title: route.params.kanji + '  Examples'});
        searchForExamples(route.params.kanji, (data) => getExamples(data));
    }, []);

    // Filter the needed data from the API
    const getExamples = (data) => {
        if (Array.isArray(data)) {
            const arr = [];
            for (let ex of data) {
                arr.push({
                    pieces: ex.pieces,
                    sentence: ex.kanji,
                    translation: ex.english
                })
            }
            setExamples(arr);
        } else {
            setExamples(['Could not fetch examples. Check your internet connection and try again'])
        }
    }

    const ListItem = ({pieces, sentence, translation}) => {
        return (
            <View style={{flex: 1, margin: 10}}>
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
        <LinearGradient colors={[colors.backgroundLight, colors.backgroundDark]}
                        style={route ? style.screenContainer : style.container}>
            {examples.length ?
                typeof examples[0] !== 'string' ?
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) =>
                            <ListItem pieces={item.pieces} sentence={item.sentence} translation={item.translation}/>
                        }
                        ItemSeparatorComponent={() =>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch',
                                height: 3,
                                borderWidth: 1.5,
                                borderRadius: 10,
                                borderColor: colors.border
                            }}/>
                        }
                        data={examples}
                    />
                    :
                    <Text>{examples[0]}</Text>
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
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            borderRadius: 30,
            marginTop: 15,
            paddingBottom: 35
        },
        screenContainer: {
            flex: 1,
            padding: 10,
            paddingBottom: 0,
            paddingTop: 0
        },
        ex: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: font.regular,
            flexWrap: 'wrap',
            flex: 1,
        },
    })
};
