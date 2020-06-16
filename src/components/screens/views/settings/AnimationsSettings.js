import React from "react";
import {setAnimationSpeed, setSkipAnimations} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";
import {useTheme} from "@react-navigation/native";
import {setSetting} from "../../../../persistence/DbConnection";
import {Slider, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";

const SkipAnimationsSetting = ({skipAnimations, setSkipAnimations}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    const toggleSkipAnimations = () => {
        setSetting('skipAnimations', skipAnimations === 'true' ? 'false' : 'true', setSkipAnimations)
    };

    return (
        <TouchableOpacity style={style.button} activeOpacity={0.5} onPress={() => toggleSkipAnimations()}>
            <Text style={style.text}>SkipAnimations</Text>
            {<Icon
                name={skipAnimations === 'true' ? 'ios-checkmark-circle' : 'ios-close-circle'}
                size={font.medium}
                type='ionicon'
                color={colors.primary}
            />}
        </TouchableOpacity>
    )
}

const AnimationSpeedSetting = ({animationSpeed, setAnimationSpeed, skipAnimations}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    return (
        <View style={{...style.button, marginRight: 18}}>
            <View>
                <View style={{flex: 1}}>
                    <Text style={{...style.text, marginRight: 10, marginTop: Platform.OS === 'ios' ? 7 : -3}}>Animation
                        Speed</Text>
                </View>
                <View style={{flex: 1}}/>
            </View>
            <View style={{flex: 1}}>
                <Slider
                    disabled={skipAnimations === 'true'}
                    onSlidingComplete={(value) => setAnimationSpeed({value: value.toFixed(0)})}
                    minimumValue={500}
                    maximumValue={3000}
                    value={parseInt(animationSpeed)}
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor={colors.text}
                    thumbTintColor={colors.primary}
                />
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={style.sliderText}>Fast</Text>
                    <Text style={style.sliderText}>Slow</Text>
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
    skipAnimations: state.skipAnimations
});

const mapDispatchToProps = (dispatch) => ({
    setSkipAnimations: (skipAnimations) => dispatch(setSkipAnimations(skipAnimations))
});

const mapState2ToProps = state => ({
    animationSpeed: state.animationSpeed,
    skipAnimations: state.skipAnimations
});

const mapDispatch2ToProps = (dispatch) => ({
    setAnimationSpeed: (animationSpeed) => dispatch(setAnimationSpeed(animationSpeed))
});

export const ConnectedSkipAnimationsSetting = connect(mapStateToProps, mapDispatchToProps)(SkipAnimationsSetting);
export const ConnectedAnimationSpeedSetting = connect(mapState2ToProps, mapDispatch2ToProps)(AnimationSpeedSetting);

const getStyle = (colors, font) => {
    return StyleSheet.create({
        button: {
            flex: 1,
            marginLeft: 30,
            marginRight: 23,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
            alignItems: 'center'
        },
        text: {
            fontSize: font.regular,
            fontFamily: font.fontFamily,
            color: colors.text
        },
        sliderText: {
            fontSize: 14,
            fontFamily: font.fontFamily,
            color: colors.text
        }
    });
};
