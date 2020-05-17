import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useTheme} from "@react-navigation/native";
import {setKunyomi, setOnyomi} from "../../../../redux/actions/Actions";
import {connect} from "react-redux";
import {setSetting} from "../../../../persistence/DbConnection";
import {convert} from "../../../helper/ReadingConverter";

/**
 * Button to update reading preferences. Used inside the reading accordion
 * @param title Title to display on the button
 * @param type Type of the setting in the DB (onReading, kunReading)
 * @param kunyomi Global state of the Kun reading
 * @param onyomi Global state of the On reading
 * @param setKunyomi Setter for the global state of the Kun reading
 * @param setOnyomi Setter for the global state of the On reading
 */
const ReadingSetting = ({title, type, kunyomi, onyomi, setKunyomi, setOnyomi}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    // Update the reading in the DB and update the state
    const setReading = () => {
        if (title === 'Kunyomi') {
            setSetting(type, getNextReading(kunyomi), setKunyomi)
        } else {
            setSetting(type, getNextReading(onyomi), setOnyomi)
        }
    };

    // Display the title based on the chosen characters
    // Romaji is default, so it doesn't need to be converted
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

// The three different character sets to choose from
const readings = ['romaji', 'hiragana', 'katakana'];

// Get the next character set from the array
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
            marginLeft: 30,
            marginRight: 23,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
            alignItems: 'center',
        }
    });
};
