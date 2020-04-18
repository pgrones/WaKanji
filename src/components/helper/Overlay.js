import React, {useState} from "react";
import {Modal, Text, TouchableHighlight, View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {useTheme} from "@react-navigation/native";

export const Overlay = ({isVisible, setVisible, content}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
        >
            <ScrollView bounces={false} contentContainerStyle={style.centered}>
                <View style={style.modalView}>
                    <Text style={style.modalText}>{content}</Text>

                    <TouchableOpacity style={style.button} activeOpacity={0.5} onPress={() => {
                        setVisible(!isVisible);
                    }}>
                        <Text style={{...style.textStyle, color: colors.buttonText}}>Got it! 分かった!</Text>
                    </TouchableOpacity>
                </View>
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
        },
        modalView: {
            margin: 10,
            backgroundColor: colors.card,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.border,
            padding: 20,
            justifyContent: 'center',
            alignItems: "stretch",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,
            elevation: 8,
        },
        button: {
            backgroundColor: colors.primary,
            borderRadius: 35,
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
