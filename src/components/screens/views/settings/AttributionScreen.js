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
            <FlatList data={DATA} keyExtractor={(item, index) => index.toString()} renderItem={({item, index}) =>
                <View style={{marginBottom: 10}}>
                    {index === 0 &&
                    <>
                        <Button title='Jisho.org' onPress={() => Linking.openURL('https://jisho.org')}
                                icon='external-link' type='feather'/>
                        <Button title='Tatoeba.org' onPress={() => Linking.openURL('https://tatoeba.org')}
                                icon='external-link' type='feather'/>
                    </>
                    }
                    <View style={style.container}>
                        <Text style={{color: colors.text, fontFamily: font.fontFamily}}>
                            {item}
                        </Text>
                        {index === 0 &&
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

const DATA = [
    'Example Sentences:\n\nAll of the example sentences are from Tatoeba.org and released under the CC - BY 2.0 FR licence.\n\n' +
    'The (unofficial) Jisho API is used to fetch these examples for each Kanji. Permission to scrape the html was granted by Jisho\'s admin Kimtaro here:',
    'KanjiStrokeOrders Font:' +
    '\n\n' +
    'Copyright (C) 2004-2020 Ulrich Apel, the AAAA project and the Wadoku project\n' +
    'All rights reserved.' +
    '\n\n' +
    '1. Redistributions of source code must retain the above copyright' +
    'notice, this list of conditions and the following disclaimer.' +
    '\n\n' +
    '2. Redistributions in binary form must reproduce the above copyright ' +
    'notice, this list of conditions and the following disclaimer in the ' +
    'documentation and/or other materials provided with the distribution.' +
    '\n\n' +
    '3. Neither the name of the author may be used to endorse or promote products ' +
    'derived from this software without specific prior written permission.' +
    '\n\n' +
    'THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS\'\' AND ANY EXPRESS OR ' +
    'IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES ' +
    'OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. ' +
    'IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, ' +
    'INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT ' +
    'NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, ' +
    'DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY ' +
    'THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT ' +
    '(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF TKaHE USE OF ' +
    'THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.'
]
