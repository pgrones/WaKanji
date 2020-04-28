import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from "@react-navigation/native";
import {Icon} from "react-native-elements";
import {Overlay} from "../../../helper/Overlay";

const PracticeSelectionScreen = ({navigation}) => {
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
                                  onPress={() => navigation.push('Game', {game: 0})}>
                    <Text style={style.buttonText}>Game</Text>
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

export default PracticeSelectionScreen

const getStyle = (colors, font) => {
    return StyleSheet.create({
        container: {
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 5,
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
            fontSize: font.large
        },
        help: {
            position: 'absolute',
            bottom: 5,
            right: 6
        }
    })
};

const exp1 = 'Some explanation';
