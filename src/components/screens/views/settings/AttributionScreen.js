import React from "react";
import {FlatList, Linking, StyleSheet, Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {Button} from "../../../helper/Button";
import {LinearGradient} from "expo-linear-gradient";

/**
 * Screen to display various attributions for APIs and sources
 */
export const AttributionScreen = () => {
    const {colors, font} = useTheme();
    const style = getStyle();

    return (
        <LinearGradient colors={[colors.backgroundLight, colors.backgroundDark]} style={{flex: 1}}>
            <Button title='Jisho.org' onPress={() => Linking.openURL('https://jisho.org')}
                    icon='external-link' type='feather'/>
            <Button title='Tatoeba.org' onPress={() => Linking.openURL('https://tatoeba.org')}
                    icon='external-link' type='feather'/>
            <Button title='KanjiVG.net' onPress={() => Linking.openURL('http://kanjivg.tagaini.net')}
                    icon='external-link' type='feather'/>
            <FlatList data={DATA} keyExtractor={(item, index) => index.toString()} renderItem={({item, index}) =>
                <View style={{marginBottom: 10}}>
                    <View style={style.container}>
                        <Text style={{color: colors.text, fontFamily: font.fontFamily}}>
                            {item}
                        </Text>
                        {index === 1 &&
                        <Text style={{color: colors.primary, fontFamily: font.fontFamily}}
                              onPress={() => Linking.openURL('http://jisho.org/forum/54fefc1f6e73340b1f160000-is-there-any-kind-of-search-api')}>
                            Jisho.org Forum Post
                        </Text>
                        }
                    </View>
                </View>}
            />
        </LinearGradient>
    )
};

const getStyle = () => {
    return StyleSheet.create({
        container: {
            margin: 10,
            marginBottom: 0,
            padding: 10
        }
    })
};

//TODO any other npm packages
const DATA = [
    'Kanji SVGs:\nCopyright (C) 2009-2013 Ulrich Apel.\n' +
    'The SVGs used to the draw/animate the Kanji are provided by KanjiVG under the Creative Commons Attribution-Share Alike 3.0 Licence.',
    'Example Sentences:\nAll of the example sentences are from Tatoeba.org and released under the CC - BY 2.0 FR licence.\n\n' +
    'The (unofficial) Jisho API is used to fetch these examples for each Kanji. Permission to scrape the html was granted by Jisho\'s admin Kimtaro here:'
]
