import React, {useState} from "react";
import {Text, View, StyleSheet} from "react-native";
import {getKanjiById} from "../../persistence/DbConnection";

export const KanjiGridScreen = ({route, navigation}) => {
    navigation.setOptions({title: route.params.header});
    const [kanji, setKanji] = useState(null);

    if (!kanji) {
        getKanjiById(route.params.gradeId, setKanji);
    }

    return (
        <View style={style.container}>
            {kanji && kanji.length > 0 ?
                kanji.map((item) => <Text style={{fontSize: 50}} key={item.id}>{item.kanji}</Text>)
                : <Text>No Kanji available yet</Text>}
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
});
