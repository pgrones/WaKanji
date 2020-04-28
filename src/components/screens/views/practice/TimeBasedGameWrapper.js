import React, {useEffect, useRef, useState} from "react";
import TimeBasedGame from "./TimeBasedGame";
import {Animated, Dimensions, Easing} from "react-native";

export const TimeBasedGameWrapper = () => {
    const [next, setNext] = useState(true);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 100,
            easing: Easing.out(Easing.ease),
            duration: 300
        }).start();
    }, [next]);

    const getNext = () => {
        Animated.timing(animation, {
            toValue: 200,
            easing: Easing.out(Easing.ease),
            duration: 300
        }).start(({finished}) => {
            if (finished) {
                animation.setValue(0);
                setNext(!next);
            }
        });
    };

    return (
        <Animated.View key={next} style={{
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
        }}>
            <TimeBasedGame next={getNext}/>
        </Animated.View>
    )
};
