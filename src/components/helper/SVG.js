import React, {useEffect, useRef, useState} from "react";
import Svg, {Path} from "react-native-svg";
import {useTheme} from "@react-navigation/native";
import {Animated} from "react-native";

export const SVG = ({ds}) => {
    const {colors} = useTheme();

    return (
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
            {ds.map((d, index) =>
                <SvgPath
                    key={index.toString()}
                    d={d}
                    color={colors.text}
                    delay={index * 2500}
                />
            )}
        </Svg>
    )
}

const SvgPath = ({d, color, delay}) => {
    const [offset, setOffset] = useState(1000);

    const animation = useRef(new Animated.Value(1000)).current;
    animation.addListener(({value}) => setOffset(value));

    useEffect(() => {
        Animated.timing(
            animation,
            {
                toValue: 900,
                duration: 2500,
                delay: delay,
                useNativeDriver: true,
            },
        ).start();

        return () => animation.removeAllListeners();
    }, [])

    return (
        <Path
            strokeDasharray={1000}
            strokeDashoffset={offset}
            strokeLinecap={"round"}
            stroke={color}
            strokeWidth={"4.5"}
            d={d}
        />
    )
}
