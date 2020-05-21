import React, {useEffect, useRef, useState} from "react";
import Svg, {G, Path, Text} from "react-native-svg";
import {useTheme} from "@react-navigation/native";
import {Animated} from "react-native";

export const SVG = ({ds, strokeNumbers}) => {
    const {colors} = useTheme();

    return (
        <Svg height="100%" width="100%" viewBox="0 0 110 110">
            {ds.map((d, index) =>
                <SvgPath
                    key={index.toString()}
                    d={d}
                    colors={colors}
                    delay={index * 2000}
                    strokeNumber={strokeNumbers[index]}
                    number={index + 1}
                />
            )}
        </Svg>
    )
}

const SvgPath = ({d, colors, delay, strokeNumber, number}) => {
    const [offset, setOffset] = useState(1000);

    const animation = useRef(new Animated.Value(1000)).current;
    animation.addListener(({value}) => setOffset(value));

    useEffect(() => {
        Animated.timing(
            animation,
            {
                toValue: 800,
                duration: 2000,
                delay: delay,
                useNativeDriver: true,
            },
        ).start();

        return () => animation.removeAllListeners();
    }, [])

    return (
        <G>
            {offset < 1000 &&
            <Text stroke={colors.text} strokeWidth={0.1} fontSize={8} fill={colors.text}
                  transform={strokeNumber}>{number}</Text>
            }
            <Path
                strokeDasharray={1000}
                strokeDashoffset={offset}
                strokeLinecap={"round"}
                stroke={offset > 910 ? colors.primary : colors.text}
                strokeWidth={"4.5"}
                d={d}
            />
        </G>
    )
}
