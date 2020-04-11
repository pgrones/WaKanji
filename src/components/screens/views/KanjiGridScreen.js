import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {getKanjiById} from "../../../persistence/DbConnection";
import {setKanji} from "../../redux/actions/Actions";
import {connect} from "react-redux";

const KanjiGridScreen = ({route, navigation, kanji, setKanji}) => {
    navigation.setOptions({title: route.params.header});
    getKanjiById(route.params.gradeId, setKanji);

    return (
        <View style={style.container}>
            {kanji && kanji.length > 0 ?
                kanji.map((item) => <Text style={{fontSize: 50}} key={item.id}>{item.kanji}</Text>)
                : <Text>No Kanji available yet</Text>}
        </View>
    )
};

const mapStateToProps = state => ({
    kanji: state.kanji
});

const mapDispatchToProps = (dispatch) => ({
    setKanji: (kanji) => dispatch(setKanji(kanji))
});

export default connect(mapStateToProps, mapDispatchToProps)(KanjiGridScreen);

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
});
