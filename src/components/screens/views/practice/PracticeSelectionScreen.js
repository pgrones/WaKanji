import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from "@react-navigation/native";
import {Icon} from "react-native-elements";
import {Overlay} from "../../../helper/Overlay";
import {setNavigationVisible} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";

const PracticeSelectionScreen = ({navigation, setNavigationVisible}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [explanation, setExplanation] = useState();

    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    const openModal = (exp) => {
        setExplanation(exp);
        setModalVisible(true)
    };

    return (
        <View style={style.container}>
            <View style={style.wrapper}>
                <TouchableOpacity style={style.button} activeOpacity={0.5}
                                  onPress={() => {
                                      navigation.push('Game', {game: 0});
                                      setNavigationVisible(false);
                                  }}>
                    <Image style={{width: 155, height: 155}} source={require('../../../../../assets/flashcards.png')}/>
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

            <Overlay isVisible={modalVisible} setVisible={setModalVisible} content={explanation}/>
        </View>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setNavigationVisible: (visible) => dispatch(setNavigationVisible(visible))
});

export default connect(null, mapDispatchToProps)(PracticeSelectionScreen);

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
            borderWidth: 2,
            borderRadius: 10,
            borderColor: colors.border,
            backgroundColor: colors.card,
            aspectRatio: 1,
            minWidth: '40%',
            margin: 5
        },
        buttonText: {
            color: colors.primary,
            fontFamily: font.fontFamily,
            fontSize: font.large,
        },
        help: {
            position: 'absolute',
            bottom: 5,
            right: 6
        }
    })
};

const exp1 = "This game takes the term 'flash cards' literally and offers a quick-paced, time-based, multiple choice game" +
    " that tests your recollection speed.\n\nThis game is primarily meant to have fun. Use the other games to study more efficiently.";
