import React from "react";
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useTheme} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";

/**
 * Modal to display above all other components. Useful for explanations or information
 * The visible state is handled by the component that is using the modal
 * @param isVisible Boolean if the modal is visible
 * @param setVisible Function to hide the modal again
 * @param content String that is rendered inside the modal
 */
export const Overlay = ({isVisible, setVisible, content}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                // Apparently needed for Apple TVs
                Alert.alert("Modal has been closed.");
            }}
        >
            <ScrollView contentContainerStyle={style.centered} bounces={false}>
                <LinearGradient colors={[colors.backgroundLight, colors.backgroundDark]} style={style.modalView}>
                    <Text style={style.modalText}>{content}</Text>
                    <TouchableOpacity style={style.button} activeOpacity={0.5} onPress={() => {
                        setVisible(!isVisible);
                    }}>
                        <Text style={{...style.textStyle, color: colors.buttonText}}>Got it! 分かった!</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ScrollView>
        </Modal>
    );
};

const getStyle = (colors, font) => {
    return StyleSheet.create({
        centered: {
            flex: 1,
            justifyContent: "center",
            alignItems: "stretch",
            backgroundColor: 'rgba(100,100,100, 0.5)',
        },
        modalView: {
            margin: 10,
            padding: 20,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: "stretch"
        },
        button: {
            backgroundColor: colors.primary,
            borderRadius: 20,
            padding: 10,
        },
        textStyle: {
            color: colors.text,
            fontFamily: font.fontFamily,
            fontSize: font.regular,
            fontWeight: "bold",
            textAlign: "center"
        },
        modalText: {
            marginBottom: 15,
            textAlign: "center",
            color: colors.text,
            fontFamily: font.fontFamily,
            fontSize: font.regular,
        }
    });
};
