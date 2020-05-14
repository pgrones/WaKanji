import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {useTheme} from "@react-navigation/native";

/**
 * Accordion component that can open and close, revealing/hiding its children
 * @param title Title displayed on the header button. Can either be a string or a component
 * @param children Children inside the Accordion
 */
export const Accordion = ({title, children}) => {
    const [expanded, setExpanded] = useState(false);
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    return (
        <View style={style.container}>
            <TouchableOpacity style={style.item} activeOpacity={0.5} onPress={() => setExpanded(!expanded)}>
                {React.isValidElement(title) ?
                    title
                    :
                    <Text style={style.title}>{title}</Text>
                }
                <Icon
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    size={font.large}
                    type='material-community'
                    color={colors.text}
                />
            </TouchableOpacity>
            {expanded && children}
        </View>
    )
};

const getStyle = (colors, font) => {
    return StyleSheet.create({
        container: {
            margin: 10,
            marginBottom: 0,
            minHeight: 40
        },
        title: {
            fontSize: font.regular,
            fontFamily: font.fontFamily,
            color: colors.text,
            fontWeight: 'bold'
        },
        item: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            paddingBottom: 0,
            alignItems: 'center',
        }
    });
};
