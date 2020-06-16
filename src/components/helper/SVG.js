import React, {useEffect, useRef, useState} from "react";
import Svg, {G, Path, Text} from "react-native-svg";
import {useTheme} from "@react-navigation/native";
import {Animated} from "react-native";
import {connect} from "react-redux";

const SVG = ({ds, strokeNumbers, skipAnimations, animationSpeed}) => {
    const [i, setI] = useState(0);
    const {colors} = useTheme();

    useEffect(() => {
        if (skipAnimations === 'false') {
            const interval = setInterval(() => setI(i => i + 1), animationSpeed);

            if (i === ds.length) {
                clearInterval(interval)
            }

            return () => clearInterval(interval);
        }
    }, [i]);

    return (
        <Svg height="100%" width="100%" viewBox="0 0 110 110">
            {ds.map((d, index) =>
                <SvgPath
                    key={index.toString()}
                    d={d}
                    strokeNumber={strokeNumbers[index]}
                    colors={colors}
                    number={index + 1}
                    duration={animationSpeed}
                    skipAnimations={skipAnimations !== 'false'}
                    start={i === index}
                />
            )}
        </Svg>
    )
}

const mapStateToProps = state => ({
    skipAnimations: state.skipAnimations,
    animationSpeed: state.animationSpeed
});

export default connect(mapStateToProps)(SVG);

const SvgPath = ({d, strokeNumber, colors, number, start, skipAnimations, duration}) => {
    const [offset, setOffset] = useState(skipAnimations ? 800 : 1000);
    const animatedValue = useRef(new Animated.Value(1000)).current;
    animatedValue.addListener(({value}) => setOffset(value));

    const animation = Animated.timing(animatedValue, {
        toValue: 800,
        duration: duration,
        useNativeDriver: true
    });

    useEffect(() => {
        if (!skipAnimations && start) {
            animation.start();
        }
    }, [start])

    useEffect(() => {
        return () => {
            animation.stop();
            animatedValue.removeAllListeners();
        }
    }, [])

    return (
        <G>
            {offset < 1000 &&
            <Text stroke={colors.text} strokeWidth={0.1} fontSize={7} fill={colors.text}
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
