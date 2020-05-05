import React, {useEffect, useRef, useState} from "react";
import TimeBasedGame from "./TimeBasedGame";
import {Animated, Dimensions, Easing, Text, View} from "react-native";
import {getRandomKanji, getTranslations} from "../../../../persistence/DbConnection";
import {Overlay} from "../../../helper/Overlay";
import ProgressBar from "../../../helper/ProgressBar";
import {setNavigationVisible} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";

const TimeBasedGameWrapper = ({navigation, setNavigationVisible}) => {
    const [id, setId] = useState(0);
    const [randomKanji, setRandomKanji] = useState([]);
    const [translations, setTranslations] = useState([]);
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [progress, setWrapperProgress] = useState(0)
    const [duration, setDuration] = useState(12000);
    const [isModalVisible, setModalVisible] = useState(false);
    const [stop, setStop] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        getRandomKanji(setRandomKanji);
        getTranslations(setTranslations);
        Animated.timing(animation, {
            toValue: 100,
            duration: 1000
        }).start(() => {
            animation.setValue(0);
        });
    }, []);

    useEffect(() => {
        if (id > 0) {
            if (duration > 2000) {
                setDuration(duration - 500)
            }
        }

        setId(id + 1);

        Animated.timing(animation, {
            toValue: 100,
            easing: Easing.out(Easing.ease),
            duration: 300
        }).start();
    }, [index]);

    useEffect(() => {
        if (id > 0) {
            setScore(score + progress + (0.05 * -duration + 600));
        }
    }, [progress])

    const getNext = () => {
        setStop(true);

        Animated.timing(animation, {
            toValue: 200,
            easing: Easing.out(Easing.ease),
            duration: 300
        }).start(({finished}) => {
            if (finished) {
                animation.setValue(0);
                if (index < randomKanji.length - 1) {
                    setIndex(index + 1)
                } else {
                    setRandomKanji(randomKanji.sort(() => Math.random() - 0.5));
                    setIndex(0);
                }
                setStop(false);
            }
        });
    };

    const getTranslationsArray = () => {
        const t = [];
        t.push(randomKanji[index].translation.split(',')[0]);

        for (let i = 0; i < 3; i++) {
            const translation = translations[Math.floor(Math.random() * translations.length)].translation.split(',')[0];
            if (t.indexOf(translation) < 0) {
                t.push(translation);
            } else {
                i--;
            }
        }

        return t.sort(() => Math.random() - 0.5);
    };

    const closeModal = (visible) => {
        setModalVisible(visible);
        setNavigationVisible(true);
        navigation.goBack();
    };

    return (
        !isModalVisible ?
            randomKanji.length && translations.length ?
                <Animated.View
                    key={id} //Could lead to problems
                    style={{
                        position: 'absolute',
                        left: animation.interpolate({
                            inputRange: [0, 100, 200],
                            outputRange: [Dimensions.get('screen').width, 0, -Dimensions.get('screen').width],
                        }),
                        top: 0,
                        bottom: 0,
                        right: animation.interpolate({
                            inputRange: [0, 100, 200],
                            outputRange: [-Dimensions.get('screen').width, 0, Dimensions.get('screen').width],
                        })
                    }}
                >
                    <View style={{flex: 1, marginBottom: 50}}>
                        <ProgressBar duration={duration} setWrapperProgress={setWrapperProgress} stop={stop}
                                     onFinish={() => setModalVisible(true)}
                                     text={score.toFixed(0)}/>
                        <TimeBasedGame
                            next={getNext}
                            kanji={randomKanji[index]}
                            translations={getTranslationsArray()}
                            setStop={setStop}
                            finish={() => {
                                setStop(true);
                                setModalVisible(true)
                            }}
                        />
                    </View>
                </Animated.View>
                : <View><Text>Loading</Text></View> //TODO make nicer
            :
            <Overlay isVisible={isModalVisible} setVisible={closeModal} content={'Finish\nScore: ' + score.toFixed(0)}/>
    )
};

const mapDispatchToProps = (dispatch) => ({
    setNavigationVisible: (visible) => dispatch(setNavigationVisible(visible))
});

export default connect(null, mapDispatchToProps)(TimeBasedGameWrapper);
