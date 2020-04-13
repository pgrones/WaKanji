import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {Icon} from 'react-native-elements';

const KanjiInfoScreen = ({route, navigation}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);
    navigation.setOptions({title: route.params.header});
    const info = route.params.info;

    return (
        <View style={style.container}>
            <View style={style.kanjiBg}>
                <Text style={style.kanji}>{info.kanji}</Text>
                <Text style={style.translation}>{info.translation}</Text>
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
                <Text style={style.reading}>{info.kunReading}</Text>
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
                <Text style={style.translation}>{info.onReading}</Text>
            </View>
            <TouchableOpacity style={style.button} activeOpacity={0.5}>
                <Text style={style.buttonText}>Got it! 分かった!</Text>
            </TouchableOpacity>
        </View>
    )
};

export default KanjiInfoScreen;

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
        kanjiBg: {
            paddingBottom: 10,
            alignSelf: 'stretch',
            alignItems: 'center',
            borderColor: colors.border,
            backgroundColor: colors.card,
            borderWidth: 2,
            borderRadius: 10,
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
            alignItems: 'center'
        },
        buttonText:{
            fontFamily: font.fontFamily,
            color: colors.primary,
            fontSize: font.large,

        }
    });
};

// const mapStateToProps = state => ({
//     info: state.info
// });
//
// const mapDispatchToProps = (dispatch) => ({
//     setKanjiInfo: (info) => dispatch(setKanjiInfo(info))
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(KanjiInfoScreen)
