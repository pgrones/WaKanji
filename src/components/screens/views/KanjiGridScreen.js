import React from "react";
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import {getKanjiByGradeId} from "../../../persistence/DbConnection";
import {setKanji} from "../../redux/actions/Actions";
import {connect} from "react-redux";
import {useTheme} from "@react-navigation/native";

const KanjiGridScreen = ({route, navigation, kanji, setKanji}) => {
    navigation.setOptions({title: route.params.header});
    const {colors, font} = useTheme();
    getKanjiByGradeId(route.params.gradeId, setKanji);
    const style = getStyle(colors, font);

    return (
        <ScrollView contentContainerStyle={style.container}>
            {kanji && kanji.length > 0 ?
                kanji.map((item) =>
                    <View style={style.kanjiButtonWrapper} key={item.id}>
                        <TouchableOpacity style={style.kanjiButton}>
                            <Text style={style.kanji}>
                                {item.kanji}
                            </Text>
                        </TouchableOpacity>
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
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 10
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
            minWidth: 60,
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
        }
    })
};
