import React, {Component} from 'react';
import {setKanjiGotIt} from "../../../../persistence/DbConnection";
import {setKanji} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";
import Swiper from 'react-native-swiper';
import KanjiInfo from "./KanjiInfo";
import {LinearGradient} from "expo-linear-gradient";
import {useTheme} from "@react-navigation/native";

/**
 * Wrapper around the KanjiInfo to enable a swipe action
 */
class SwiperWrapper extends Component {
    constructor(props) {
        super(props);
        props.navigation.setOptions({title: props.route.params.header});
    }

    render() {
        const {route, navigation, kanji, setKanji, theme} = this.props;

        const setGotIt = (id, state, gradeId, i) => {
            setKanjiGotIt(id, state, gradeId, setKanji);
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
                            prev={index - 1 >= 0 ? kanji[index - 1].kanji : false}
                            next={index + 1 < kanji.length ? kanji[index + 1].kanji : false}
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
        <SwiperWrapper {...props} theme={theme}/>
    )
}

const mapStateToProps = state => ({
    kanji: state.kanji,
});

const mapDispatchToProps = (dispatch) => ({
    setKanji: (kanji) => dispatch(setKanji(kanji))
});

export default connect(mapStateToProps, mapDispatchToProps)(KanjiInfoScreen);

