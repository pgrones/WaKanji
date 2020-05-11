import React, {useEffect} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getKanjiByGradeId} from "../../../../persistence/DbConnection";
import {setKanji} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";
import {useTheme} from "@react-navigation/native";
import {Icon} from "react-native-elements";

const KanjiGridScreen = ({route, navigation, kanji, setKanji}) => {
    navigation.setOptions({title: route.params.header});
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    useEffect(() => {
        if (kanji.length === 0 || (kanji[0] && route.params.gradeId !== kanji[0].gradeId)) {
            getKanjiByGradeId(route.params.gradeId, setKanji);
        }
    }, []);

    const showInfo = (item, index) => {
        navigation.push('KanjiInfo', {header: item.kanji, index: index})
    };

    return (
        <ScrollView contentContainerStyle={style.container}>
            {kanji && kanji.length > 0 ?
                kanji.map((item, index) =>
                    <View style={style.kanjiButtonWrapper} key={item.id}>
                        <TouchableOpacity activeOpacity={0.5} style={style.kanjiButton}
                                          onPress={() => showInfo(item, index)}>
                            <Text style={style.kanji}>
                                {item.kanji}
                            </Text>
                        </TouchableOpacity>
                        {item.gotIt === 1 &&
                        <View style={style.gotItIcon}>
                            <Icon
                                name={'ios-checkmark-circle'}
                                size={font.regular}
                                type='ionicon'
                                color={colors.primary}
                                containerStyle={{backgroundColor: 'transparent'}}
                            />
                        </View>
                        }
                    </View>
                )
                : <Text style={style.noKanjiAvailable}>No Kanji available yet</Text>}
        </ScrollView>
    )
};

const mapStateToProps = state => ({
    kanji: state.kanji
});

const mapDispatchToProps = (dispatch) => ({
    setKanji: (kanji) => dispatch(setKanji(kanji))
});

export default connect(mapStateToProps, mapDispatchToProps)(KanjiGridScreen);

const getStyle = (colors, font) => {
    return StyleSheet.create({
        container: {
            flexGrow: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 10,
            paddingBottom: 20
        },
        kanjiButtonWrapper: {
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'center',
            borderWidth: 2,
            borderRadius: 10,
            borderColor: colors.border,
            backgroundColor: colors.card,
            aspectRatio: 1,
            minWidth: '16%',
            margin: 5
        },
        kanjiButton: {
            margin: 2,
            alignItems: 'center',
            justifyContent: 'center'
        },
        kanji: {
            marginTop: -5,
            fontSize: 50,
            color: colors.text,
            fontFamily: font.fontFamily
        },
        noKanjiAvailable: {
            fontSize: font.regular,
            fontFamily: font.fontFamily,
            color: colors.text
        },
        gotItIcon: {
            position: 'absolute',
            bottom: 0,
            right: 3
        }
    })
};
