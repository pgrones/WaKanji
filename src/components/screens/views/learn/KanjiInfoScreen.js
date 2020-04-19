import React, {useEffect, useState} from 'react';
import {getKanjiInfoById, setKanjiGotIt} from "../../../../persistence/DbConnection";
import {setKanji, setKanjiInfo} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";
import Swiper from 'react-native-swiper'
import KanjiInfo from "./KanjiInfo";

const KanjiInfoScreen = ({route, navigation, kanji, setKanjiInfo, setKanji}) => {
    navigation.setOptions({title: route.params.header});

    const setGotIt = (id, state, gradeId) => {
        setKanjiGotIt(id, state, gradeId, setKanji);
    };

    return (
        <Swiper
            showsPagination={false}
            loadMinimal={true} loadMinimalSize={1}
            index={route.params.index}
            loop={false}
            onIndexChanged={(index) => navigation.setOptions({title: kanji[index].kanji})}
        >
            {kanji.map((item, index) =>
                <KanjiInfo key={index} kanjiInfo={item}
                           prev={index - 1 >= 0 ? kanji[index - 1].kanji : false}
                           next={index + 1 < kanji.length ? kanji[index + 1].kanji : false}
                           setGotIt={setGotIt}
                />
            )}
        </Swiper>
    )
};

const mapStateToProps = state => ({
    kanji: state.kanji,
    kanjiInfo: state.kanjiInfo
});

const mapDispatchToProps = (dispatch) => ({
    setKanji: (kanji) => dispatch(setKanji(kanji)),
    setKanjiInfo: (kanji) => dispatch(setKanjiInfo(kanji))
});

export default connect(mapStateToProps, mapDispatchToProps)(KanjiInfoScreen)
