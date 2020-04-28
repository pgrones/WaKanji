import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import {useTheme} from "@react-navigation/native";

const ProgressBar = ({duration, onFinish, children}) => {
    const {colors} = useTheme();
    const style = getStyle(colors);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 100,
            easing: Easing.out(Easing.ease),
            duration: duration,
            delay: 200
        }).start(({finished}) => {
            if (finished) {
                onFinish();
            }
        });
    }, []);

    return (
        <View style={style.progressBar}>
            <Animated.View style={[style.absoluteFill, {
                backgroundColor: animation.interpolate({
                    inputRange: [0, 50, 100],
                    outputRange: ['#2ECC40', '#FF851B', '#f2291d'],
                }),
                width: animation.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['100%', '0%'],
                }),
                top: animation.interpolate({
                    inputRange: [0, 95, 100],
                    outputRange: [0, 0, 5],
                }),
                bottom: animation.interpolate({
                    inputRange: [0, 95, 100],
                    outputRange: [0, 0, 5],
                })
            }]}/>
            {children}
        </View>
    );
};

export default ProgressBar

const getStyle = (colors) => {
    return StyleSheet.create({
        progressBar: {
            flex: 1,
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 2,
            borderRadius: 10,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },
        absoluteFill: {
            borderRadius: 10,
            position: 'absolute',
            left: 0,
            right: 0
        }
    })
};
