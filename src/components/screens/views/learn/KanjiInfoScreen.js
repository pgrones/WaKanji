import React, {Component} from 'react';
import {setKanjiGotIt} from "../../../../persistence/DbConnection";
import {setGotItAmountByGrade, setKanji} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";
import Swiper from 'react-native-swiper';
import KanjiInfo from "./KanjiInfo";
import {LinearGradient} from "expo-linear-gradient";
import {useTheme} from "@react-navigation/native";

/**
 * Wrapper around the KanjiInfo to enable a swipe action
 */
class InfoSwiperWrapper extends Component {
    constructor(props) {
        super(props);
        props.navigation.setOptions({title: props.route.params.header});
    }

    render() {
        const {route, navigation, kanji, setKanji, gotItAmountByGrade, setGotItAmountByGrade, theme} = this.props;

        const setGotIt = (id, state, gradeId, i) => {
            setKanjiGotIt(id, state, gradeId, setKanji);
            const amount = gotItAmountByGrade[gradeId];
            setGotItAmountByGrade({id: gradeId, amount: state ? amount + 1 : amount - 1})
            navigation.setOptions({title: kanji[i].kanji})
        };

        const scrollBy = (index) => {
            this.swiper.scrollBy(index);
        };

        return (
            <LinearGradient colors={[theme.colors.backgroundLight, theme.colors.backgroundDark]} style={{flex: 1}}>
                <Swiper
                    ref={(swiper) => {
                        this.swiper = swiper;
                    }}
                    showsPagination={false}
                    loadMinimal={true} loadMinimalSize={0}
                    index={route.params.index}
                    loop={false}
                    onIndexChanged={(index) => navigation.setOptions({title: kanji[index].kanji})}
                >
                    {kanji.map((item, index) =>
                        <KanjiInfo
                            key={index}
                            navigation={navigation}
                            kanjiInfo={item}
                            index={index}
                            prev={kanji[index - 1] ? kanji[index - 1].kanji : false}
                            next={kanji[index + 1] ? kanji[index + 1].kanji : false}
                            setGotIt={setGotIt}
                            scrollBy={scrollBy}
                        />
                    )}
                </Swiper>
            </LinearGradient>
        )
    }
}

const KanjiInfoScreen = (props) => {
    const theme = useTheme();

    return (
        <InfoSwiperWrapper {...props} theme={theme}/>
    )
}

const mapStateToProps = state => ({
    kanji: state.kanji,
    gotItAmountByGrade: state.gotItAmountByGrade
});

const mapDispatchToProps = (dispatch) => ({
    setKanji: (kanji) => dispatch(setKanji(kanji)),
    setGotItAmountByGrade: (obj) => dispatch(setGotItAmountByGrade(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(KanjiInfoScreen);

