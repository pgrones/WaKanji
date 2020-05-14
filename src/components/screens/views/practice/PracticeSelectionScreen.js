import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from "@react-navigation/native";
import {Icon} from "react-native-elements";
import {Overlay} from "../../../helper/Overlay";
import {setNavigationVisible} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";
import {LinearGradient} from "expo-linear-gradient";

/**
 * Selection screen for the games
 * This screen will probably be replaced with "My Library"
 * @param navigation
 * @param gotItAmount Amount of understood Kanji
 * @param setNavigationVisible Function to hide the navigation inside a game
 */
const PracticeSelectionScreen = ({navigation, gotItAmount, setNavigationVisible}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [explanation, setExplanation] = useState();

    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    const openModal = (exp) => {
        setExplanation(exp);
        setModalVisible(true)
    };

    return (
        <LinearGradient colors={[colors.backgroundLight, colors.backgroundDark]} style={{flex: 1}}>
            <View style={style.container}>
                {gotItAmount < 10 ?
                    <TouchableOpacity style={style.buttonAmount} activeOpacity={0.5} onPress={() => {
                        navigation.navigate('Dictionary');
                    }}>
                        <Text style={style.buttonAmountText}>Mark at least 10 Kanji as learned</Text>
                    </TouchableOpacity>
                    :
                    <View style={style.wrapper}>
                        <TouchableOpacity style={style.button} activeOpacity={0.5}
                                          onPress={() => {
                                              navigation.push('Game', {game: 0});
                                              setNavigationVisible(false);
                                          }}
                        >
                            <Image style={{width: 155, height: 155}}
                                   source={require('../../../../../assets/flashcards.png')}/>
                            <TouchableOpacity style={style.help} activeOpacity={0.5} onPress={() => openModal(exp1)}>
                                <Icon
                                    name={'question'}
                                    size={24}
                                    type='simple-line-icon'
                                    color={colors.primary}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.button} activeOpacity={0.5}>
                            <Text style={style.buttonText}>WIP</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.button} activeOpacity={0.5}>
                            <Text style={style.buttonText}>WIP</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.button} activeOpacity={0.5}>
                            <Text style={style.buttonText}>WIP</Text>
                        </TouchableOpacity>
                    </View>
                }
                <Overlay isVisible={modalVisible} setVisible={setModalVisible} content={explanation}/>
            </View>
        </LinearGradient>
    );
};

const mapStateToProps = state => ({
    gotItAmount: state.gotItAmount
});

const mapDispatchToProps = (dispatch) => ({
    setNavigationVisible: (visible) => dispatch(setNavigationVisible(visible))
});

export default connect(mapStateToProps, mapDispatchToProps)(PracticeSelectionScreen);

const getStyle = (colors, font) => {
    return StyleSheet.create({
        container: {
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 5
        },
        wrapper: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center'
        },
        button: {
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            aspectRatio: 1,
            minWidth: '40%',
            margin: 5
        },
        buttonText: {
            color: colors.primary,
            fontFamily: font.fontFamily,
            fontSize: font.large,
        },
        buttonAmount: {
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            margin: 5
        },
        buttonAmountText: {
            color: colors.primary,
            fontFamily: font.fontFamily,
            fontSize: font.regular,
        },
        help: {
            position: 'absolute',
            bottom: 10,
            right: 11
        }
    })
};

const exp1 = "This game takes the term 'flash cards' literally and offers a quick-paced, time-based, multiple choice game" +
    " that tests your recollection speed.";
