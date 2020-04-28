import React, {useEffect, useRef, useState} from "react";
import TimeBasedGame from "./TimeBasedGame";
import {Animated, Dimensions, Easing, Text, View} from "react-native";
import {getRandomKanji, getTranslations} from "../../../../persistence/DbConnection";

export const TimeBasedGameWrapper = () => {
    const [id, setId] = useState(0);
    const [randomKanji, setRandomKanji] = useState([]);
    const [translations, setTranslations] = useState([]);
    const [index, setIndex] = useState(0);
    const [duration, setDuration] = useState(10000);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        getRandomKanji(setRandomKanji);
        getTranslations(setTranslations);
    }, []);

    useEffect(() => {
        if (duration > 500) {
            setDuration(duration - 500)
        }

        setId(id + 1);

        Animated.timing(animation, {
            toValue: 100,
            easing: Easing.out(Easing.ease),
            duration: 300
        }).start();
    }, [index]);

    const getNext = () => {
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

    return (
        randomKanji.length && translations.length ?
            <Animated.View
                key={id}
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
                <TimeBasedGame
                    next={getNext}
                    kanji={randomKanji[index]}
                    translations={getTranslationsArray()}
                    duration={duration}
                />
            </Animated.View>
            : <View><Text>Loading</Text></View> //TODO make nicer
    )
};
