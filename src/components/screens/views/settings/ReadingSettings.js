import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useTheme} from "@react-navigation/native";
import {setKunyomi, setOnyomi} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";
import {setSetting} from "../../../../persistence/DbConnection";
import {convert} from "../../../helper/ReadingConverter";

const ReadingSetting = ({title, type, kunyomi, onyomi, setKunyomi, setOnyomi}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    const setReading = () => {
        if (title === 'Kunyomi') {
            setSetting(type, getNextReading(kunyomi), setKunyomi)
        } else {
            setSetting(type, getNextReading(onyomi), setOnyomi)
        }
    };

    const getTitle = () => {
        if (title === 'Kunyomi') {
            if (kunyomi !== 'romaji') {
                return convert('Kun yomi', kunyomi)
            }
        } else {
            if (onyomi !== 'romaji') {
                return convert('on yomi', onyomi)
            }
        }
        return title
    };

    return (
        <TouchableOpacity style={style.button} activeOpacity={0.5} onPress={() => setReading()}>
            <Text style={style.text}>{getTitle()}</Text>
            <Text style={style.text}>
                {title === 'Kunyomi' ?
                    kunyomi.replace(/^\w/, c => c.toUpperCase())
                    : onyomi.replace(/^\w/, c => c.toUpperCase())
                }
            </Text>
        </TouchableOpacity>
    )
};

const readings = ['romaji', 'hiragana', 'katakana'];

const getNextReading = (currentReading) => {
    const index = readings.indexOf(currentReading);
    if (index + 1 === readings.length) {
        return readings[0];
    }
    return readings[index + 1]
};

const mapStateToProps = state => ({
    kunyomi: state.kunyomi,
    onyomi: state.onyomi
});

const mapDispatchToProps = (dispatch) => ({
    setKunyomi: (reading) => dispatch(setKunyomi(reading)),
    setOnyomi: (reading) => dispatch(setOnyomi(reading))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadingSetting);

const getStyle = (colors, font) => {
    return StyleSheet.create({
        text: {
            fontSize: font.regular,
            fontFamily: font.fontFamily,
            color: colors.text
        },
        button: {
            margin: 0,
            marginLeft: 20,
            marginRight: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
            alignItems: 'center',
        }
    });
};
