import React, {useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTheme} from "@react-navigation/native";

/**
 * One screen of the flashcard game. This is being re-rendered on every right answer
 * @param next Function to tell the wrapper to load the next exercise
 * @param kanji The Kanji which's meaning is being asked
 * @param translations Array with four possible answers (including the right one)
 * @param stop Stops the animation of the progress bar
 * @param finish Function to tell the wrapper that the game is over due to a wrong answer
 * @param setGameOverText Text to be shown after the game is over
 */
const TimeBasedGame = ({next, kanji, translations, stop, finish, setGameOverText}) => {
    const [disabled, setDisabled] = useState(false);
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    const stopGame = () => {
        stop();
        setDisabled(true);
    }

    return (
        <View style={{flex: 15}}>
            <View style={style.kanjiContainer}>
                <Text style={style.kanji}>{kanji.kanji}</Text>
            </View>
            <View style={style.buttonContainer}>
                <View style={style.row}>
                    <AnswerButton
                        translation={translations[0]}
                        kanji={kanji}
                        next={next}
                        stop={stopGame}
                        finish={finish}
                        setGameOverText={setGameOverText}
                        disabled={disabled}
                    />
                    <AnswerButton
                        translation={translations[1]}
                        kanji={kanji}
                        next={next}
                        stop={stopGame}
                        finish={finish}
                        setGameOverText={setGameOverText}
                        disabled={disabled}
                    />
                </View>
                <View style={style.row}>
                    <AnswerButton
                        translation={translations[2]}
                        kanji={kanji}
                        next={next}
                        stop={stopGame}
                        finish={finish}
                        setGameOverText={setGameOverText}
                        disabled={disabled}
                    />
                    <AnswerButton
                        translation={translations[3]}
                        kanji={kanji}
                        next={next}
                        stop={stopGame}
                        finish={finish}
                        setGameOverText={setGameOverText}
                        disabled={disabled}
                    />
                </View>
            </View>
        </View>
    );
};

export default TimeBasedGame;

const AnswerButton = ({translation, kanji, next, stop, finish, setGameOverText, disabled}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);
    const animation = useRef(new Animated.Value(0)).current;

    const select = () => {
        if (translation === kanji.translation) {
            next();
        } else {
            stop();
            setGameOverText(`Game Over\n\nThe right answer for ${kanji.kanji} would have been '${kanji.translation}' but you chose '${translation}'`)
            Animated.timing(animation, {
                toValue: 3,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: false
            }).start(({finished}) => {
                if (finished) {
                    finish();
                }
            });
        }
    };

    return (
        <Animated.View style={[style.buttonWrapper, {
            borderColor:
                animation.interpolate({
                    inputRange: [0, 0.1, 1, 1.01, 1.99, 2, 3],
                    outputRange: ['transparent', '#f2291d', '#f2291d', 'transparent', 'transparent', '#f2291d', '#f2291d'],
                    easing: Easing.linear
                })
        }]}>
            <TouchableOpacity style={style.button} disabled={disabled} onPress={() => select()} activeOpacity={0.5}>
                <Text style={style.buttonText}>{translation}</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

const getStyle = (colors, font) => {
    return StyleSheet.create({
        kanjiContainer: {
            flex: 5,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
            marginTop: 5
        },
        kanji: {
            fontSize: 100,
            fontFamily: font.fontFamily,
            color: colors.text
        },
        buttonContainer: {
            flex: 10,
            margin: 5,
            marginBottom: 5,
        },
        row: {
            flex: 1,
            flexDirection: 'row',
            marginBottom: 5
        },
        buttonWrapper: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 5,
            marginTop: 0,
            borderWidth: 2,
            borderRadius: 20
        },
        button: {
            flex: 1,
            alignSelf: 'stretch',
            alignItems: "center",
            justifyContent: 'center'
        },
        buttonText: {
            color: colors.primary,
            fontFamily: font.fontFamily,
            fontSize: font.large
        }
    })
};
