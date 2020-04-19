import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {useTheme} from "@react-navigation/native";

const Accordion = ({title, data}) => {
    const [expanded, setExpanded] = useState(false);
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    const toggleExpand = () => {
        setExpanded(!expanded)
    };

    return (
        <View style={style.container}>
            <TouchableOpacity style={style.item} activeOpacity={0.5} onPress={() => toggleExpand()}>
                <Text style={style.title}>{title}</Text>
                <Icon
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    size={font.large}
                    type='material-community'
                    color={colors.text}
                />
            </TouchableOpacity>
            {expanded &&
            data.map((item, index) =>
                <View style={style.child} key={index}>
                    {item}
                </View>
            )
            }
        </View>
    )
};

export default Accordion

const getStyle = (colors, font) => {
    return StyleSheet.create({
        container: {
            margin: 10,
            marginBottom: 0
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
            alignItems: 'center',
            backgroundColor: colors.card,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.border
        }
    });
};
