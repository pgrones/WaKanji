import React, {useEffect, useRef, useState} from "react";
import Svg, {G, Path, Text} from "react-native-svg";
import {useTheme} from "@react-navigation/native";
import {Animated} from "react-native";

export const SVG = ({ds, strokeNumbers}) => {
    const [offset, setOffset] = useState(1000);
    const [i, setI] = useState(0);
    const animatedValue = useRef(new Animated.Value(1000)).current;
    animatedValue.addListener(({value}) => setOffset(value));

    const {colors} = useTheme();

    const animation =
        Animated.timing(
            animatedValue,
            {
                toValue: 800,
                duration: 2000,
                useNativeDriver: true
            }
        );

    useEffect(() => {
        animation.start(({finished}) => {
            if (i < ds.length - 1 && finished) {
                animatedValue.setValue(1000);
                setI(i + 1)
            }
        });
    }, [i])

    useEffect(() => {
        return () => {
            animation.stop();
            animatedValue.removeAllListeners();
        }
    }, [])

    return (
        <Svg height="100%" width="100%" viewBox="0 0 110 110">
            {ds.map((d, index) =>
                <SvgPath
                    key={index.toString()}
                    d={d}
                    strokeNumber={strokeNumbers[index]}
                    colors={colors}
                    number={index + 1}
                    offset={i === index ? offset : i < index ? 1000 : 800}
                />
            )}
        </Svg>
    )
}

const SvgPath = ({d, strokeNumber, colors, number, offset}) => {
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
