import React, {useEffect, useRef, useState} from "react";
import TimeBasedGame from "./TimeBasedGame";
import {Animated, Dimensions, Easing, Text, View} from "react-native";
import {getRandomKanji, getTranslations} from "../../../../persistence/DbConnection";
import {Overlay} from "../../../helper/Overlay";
import ProgressBar from "../../../helper/ProgressBar";
import {setNavigationVisible} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";

const TimeBasedGameWrapper = ({navigation, setNavigationVisible}) => {
    // Kanji and answer translations
    const [translations, setTranslations] = useState([]); // All translations
    const [randomKanji, setRandomKanji] = useState([]); // All learned Kanji in random order
    const [answers, setAnswers] = useState([]); // Possible answers (length 4)
    const [index, setIndex] = useState(0); // Index of the current random Kanji
    //Score system
    const [score, setScore] = useState(0); // Score number in progressbar
    const [remainingTime, setRemainingTime] = useState(0) // Remaining time
    //Animations
    const [duration, setDuration] = useState(12000); // Duration for one flashcard (indicated by progressbar)
    const [stop, setStop] = useState(false); // Stops the progressbar on answer
    const animation = useRef(new Animated.Value(0)).current; // ref for the animation
    //Modal
    const [isModalVisible, setModalVisible] = useState(false); // Opens/closes the modal

    // Load from DB on first render
    useEffect(() => {
        getRandomKanji(setRandomKanji);
        getTranslations(setTranslations);
    }, []);

    // Decrease the time for the next answer and slide it in
    useEffect(() => {
        if (remainingTime > 0) {
            if (duration > 2000) {
                setDuration(duration - 500)
            }
        }

        Animated.timing(animation, {
            toValue: 100,
            easing: Easing.out(Easing.ease),
            duration: 300
        }).start();
    }, [index]);

    // Get four new answers whenever the index changes (and on first render whenever translations is filled)
    useEffect(() => {
        if (randomKanji.length && translations.length) {
            const ans = [];
            ans.push(randomKanji[index].translation.split(',')[0]);

            for (let i = 0; i < 3; i++) {
                const translation = translations[Math.floor(Math.random() * translations.length)].translation.split(',')[0];
                if (ans.indexOf(translation) < 0) {
                    ans.push(translation);
                } else {
                    i--;
                }
            }

            setAnswers(ans.sort(() => Math.random() - 0.5));
        }
    }, [translations, index])

    // Increase the score on answer (remainingTime is only updated on correct answer)
    useEffect(() => {
        if (remainingTime > 0) {
            setScore(score + remainingTime + (0.05 * -duration + 600));
        }
    }, [remainingTime])

    // Stops the progressbar, slides the current card out and increase the index
    const getNext = () => {
        setStop(true);

        Animated.timing(animation, {
            toValue: 200,
            easing: Easing.out(Easing.ease),
            duration: 300
        }).start(({finished}) => {
            if (finished) {
                animation.setValue(0);
                setStop(false);
                if (index < randomKanji.length - 1) {
                    setIndex(index + 1)
                } else {
                    setRandomKanji(randomKanji.sort(() => Math.random() - 0.5));
                    setIndex(0);
                }
            }
        });
    };

    const closeModal = (visible) => {
        setModalVisible(visible);
        setNavigationVisible(true);
        navigation.goBack();
    };

    return (
        isModalVisible ?
            <Overlay isVisible={isModalVisible} setVisible={closeModal} content={'Finish\nScore: ' + score.toFixed(0)}/>
            :
            randomKanji.length && translations.length ?
                <Animated.View
                    key={index}
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
                        <ProgressBar
                            duration={duration}
                            delay={0}
                            setRemainingTime={setRemainingTime}
                            stop={stop}
                            onFinish={() => setModalVisible(true)}
                            text={score.toFixed(0)}
                        />
                        <TimeBasedGame
                            next={getNext}
                            kanji={randomKanji[index]}
                            translations={answers}
                            setStop={setStop}
                            finish={() => {
                                setStop(true);
                                setModalVisible(true)
                            }}
                        />
                    </View>
                </Animated.View>
                :
                <View><Text>Loading</Text></View> //TODO make nicer
    )
};

const mapDispatchToProps = (dispatch) => ({
    setNavigationVisible: (visible) => dispatch(setNavigationVisible(visible))
});

export default connect(null, mapDispatchToProps)(TimeBasedGameWrapper);
