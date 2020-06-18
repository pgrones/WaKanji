import React, {Component, useEffect, useState} from "react";
import Svg, {G, Path, Text} from "react-native-svg";
import {useTheme} from "@react-navigation/native";
import {Animated} from "react-native";
import {connect} from "react-redux";

const SVG = ({ds, strokeNumbers, skipAnimations, animationSpeed, skip, setSkip}) => {
    const [i, setI] = useState(0);
    const {colors} = useTheme();

    useEffect(() => {
        if (skipAnimations === 'false') {
            const interval = setInterval(() => setI(i => i + 1), parseInt(animationSpeed));

            if (i === ds.length || skip) {
                if (!skip) {
                    setSkip(true);
                }
                clearInterval(interval);
            }

            return () => clearInterval(interval);
        }
    }, [i]);

    useEffect(() => {
        if (skipAnimations === 'true') {
            if (!skip) {
                setSkip(true);
            }
        }
    }, [skipAnimations])

    return (
        <Svg height="100%" width="100%" viewBox="0 0 110 110">
            {ds.map((d, index) =>
                <SvgPath
                    key={index.toString()}
                    d={d}
                    strokeNumber={strokeNumbers[index]}
                    colors={colors}
                    number={index + 1}
                    duration={parseInt(animationSpeed)}
                    skipAnimations={skip || (skipAnimations !== 'false')}
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

const AnimatedPath = Animated.createAnimatedComponent(Path);

class SvgPath extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animation: new Animated.Value(props.skipAnimations ? 800 : 1000),
            done: props.skipAnimations
        };

        if (!props.skipAnimations) {
            this.state.animation.addListener((offset) => {
                this.animatedPathRef.setNativeProps({strokeDashoffset: offset.value});
                if (!this.state.done && offset.value < 830) {
                    this.setState({done: true});
                }
            });

            this.animation = Animated.timing(this.state.animation, {
                toValue: 800,
                duration: props.duration,
                useNativeDriver: true
            });

            if (props.start) {
                this.animation.start();
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.duration !== this.props.duration) {
            this.animation = Animated.timing(this.state.animation, {
                toValue: 800,
                duration: this.props.duration,
                useNativeDriver: true
            });
        } else if (!this.props.skipAnimations && !this.state.done && this.props.start) {
            this.animation.start();
        } else if (this.props.skipAnimations && !this.state.done) {
            this.setState({done: true})
        }
    }

    componentWillUnmount() {
        if (this.animation) {
            this.animation.stop();
        }
        this.state.animation.removeAllListeners();
    }

    render() {
        const {d, strokeNumber, colors, number, start} = this.props;

        return (
            <G>
                {(this.state.done || start) &&
                <Text stroke={colors.text} strokeWidth={0.1} fontSize={7} fill={colors.text}
                      transform={strokeNumber}>{number}</Text>
                }
                <AnimatedPath
                    ref={ref => this.animatedPathRef = ref}
                    strokeDasharray={1000}
                    strokeDashoffset={this.state.done ? 800 : 1000}
                    strokeLinecap={"round"}
                    stroke={this.state.done ? colors.text : colors.primary}
                    strokeWidth={"4.5"}
                    d={d}
                />
            </G>
        )
    }
}
