import * as React from "react";
import {useEffect, useRef} from "react";
import {Animated, Dimensions, StyleSheet, Text, View} from "react-native";
import Svg, {Path} from "react-native-svg";
import {useTheme} from "@react-navigation/native";

const {width, height} = Dimensions.get("window");
const size = width - 80;
const strokeWidth = height > 600 ? 40 : 30;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const {PI, cos, sin} = Math;
const r = (size - strokeWidth) / 2;
const cx = size / 2;
const cy = size / 2;
const A = PI + PI * 0.3;
const startAngle = PI + PI * 0.15;
const endAngle = 2 * PI - PI * 0.15;
// A rx ry x-axis-rotation large-arc-flag sweep-flag x y
const x1 = cx - r * cos(startAngle);
const y1 = -r * sin(startAngle) + cy;
const x2 = cx - r * cos(endAngle);
const y2 = -r * sin(endAngle) + cy;
const d = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;

export const ProgressArc = ({title, value1, value2, percentage}) => {
    const circumference = r * A;
    const animatedValue = useRef(new Animated.Value(1)).current;
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    const animation = Animated.timing(animatedValue, {
        toValue: 1 - percentage,
        duration: 1500,
        useNativeDriver: true
    });

    const a = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, A],
    });

    const strokeDashoffset = Animated.multiply(a, r);

    useEffect(() => {
        animation.start();
    }, [percentage])

    return (
        <View>
            <Svg width={size} height={size}>
                <Path
                    scale={[-1, 1]}
                    translateX={x1 + x2}
                    translateY={r / 4}
                    stroke={colors.backgroundDark}
                    fill="none"
                    strokeLinecap={"round"}
                    strokeDasharray={`${circumference}, ${circumference}`}
                    {...{d, strokeWidth}}
                />
                <AnimatedPath
                    scale={[-1, 1]}
                    translateX={x1 + x2}
                    translateY={r / 4}
                    stroke={colors.primary}
                    strokeLinecap={"round"}
                    fill="none"
                    strokeDasharray={`${circumference}, ${circumference}`}
                    {...{d, strokeDashoffset, strokeWidth}}
                />
            </Svg>
            <View style={style.centeredStackView}>
                <Text style={style.percentage}>{value1}</Text>
                <Text style={style.percentage}>{value2}</Text>
            </View>
            <View style={{position: "absolute", bottom: r / 4, left: 0, right: 0}}>
                <Text style={style.percentage}>{title}</Text>
            </View>
        </View>
    );
};

const getStyle = (colors, font) => {
    return (StyleSheet.create({
        percentage: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: height > 600 ? font.medium : font.regular,
            alignSelf: 'center',
            fontWeight: 'bold',
            paddingTop: 10
        },
        centeredStackView: {
            position: 'absolute',
            top: r / 4,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }))
}
