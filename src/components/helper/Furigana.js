import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";

export const Furigana = ({pieces, sentence}) => {
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    const getPiecesWithPunctuation = () => {
        const piecesCopy = [...pieces]; // Copy array to avoid unnecessary rerender
        for (let knownIssue of knownIssues) {
            if (sentence === knownIssue.sentence) {
                knownIssue.fix(piecesCopy)
            }
        }

        let piece = 0;
        for (let i = 0; i < sentence.length; i++) {
            if (piecesCopy[piece].unlifted.indexOf(sentence[i]) === -1) {
                if (piecesCopy[piece + 1] && piecesCopy[piece + 1].unlifted.indexOf(sentence[i]) !== -1) {
                    piece++;
                } else {
                    piecesCopy[piece].unlifted += sentence[i];
                }
            }
        }

        return piecesCopy
    }

    return (
        <View style={style.sentenceWrapper}>
            {getPiecesWithPunctuation().map((item, index) => {
                return (
                    <View key={index.toString()}>
                        <Text style={style.furigana}>{item.lifted}</Text>
                        <Text style={style.kanji}>{item.unlifted}</Text>
                    </View>
                )
            })}
        </View>
    )
}

const getStyle = (colors, font) => {
    return StyleSheet.create({
        sentenceWrapper: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        kanji: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: font.regular
        },
        furigana: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: 10
        }
    })
}

const knownIssues = [
    {
        sentence: 'リオのカーニバルは二月に開催される。',
        fix: (array) => array.splice(0, 1, {lifted: '', unlifted: 'リオの'})
    },
    {
        sentence: 'アメリカは世界の１／４の二酸化炭素を排出しており、一人当たりの排出量も世界で最も多いのです。',
        fix: (array) => array.splice(3, 1)
    }
]
