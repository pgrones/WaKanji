import React, {useEffect, useState} from "react";
import {Button} from "../../../helper/Button";
import {SuperScript} from "../../../helper/SuperScript";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {Icon} from "react-native-elements";
import {connect} from "react-redux";
import {getGotItAmountByGradeId, getKanjiAmountByGradeId} from "../../../../persistence/DbConnection";
import {setGotItAmountByGrade} from "../../../../redux/actions/Actions";

const Grade = ({grade, onPress, scrollUp, scrollDown, next, prev, gotItAmountByGrade, setGotItAmountByGrade}) => {
    const [amount, setAmount] = useState(0);
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    useEffect(() => {
        getKanjiAmountByGradeId(grade.id, setAmount);
        getGotItAmountByGradeId(grade.id, (count) => setGotItAmountByGrade({id: grade.id, amount: count}));
    }, [])

    return (
        <View style={style.wrapper}>
            {prev && <TouchableOpacity onPress={() => scrollUp()}>
                <Icon
                    name={'chevron-up'}
                    size={font.large}
                    type='material-community'
                    color={colors.primary}
                />
                <Text style={{...style.swipeText, marginTop: -10}}>{prev}</Text>
            </TouchableOpacity>}
            <View style={{flex: 2, justifyContent: 'center'}}>
                <Text style={style.percentage}>{gotItAmountByGrade[grade.id] / amount * 100}%</Text>
                <Text style={style.percentage}>{gotItAmountByGrade[grade.id]} / {amount}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Button
                    title={<SuperScript start={1} end={3} text={grade.grade}/>}
                    iconSize={font.large}
                    icon={'chevron-right'}
                    type={'material-community'}
                    onPress={() => onPress(grade)}
                />
            </View>
            {next && <TouchableOpacity style={{justifyContent: "flex-end"}} onPress={() => scrollDown()}>
                <Text style={{...style.swipeText, marginBottom: -5}}>{next}</Text>
                <Icon
                    name={'chevron-down'}
                    size={font.large}
                    type='material-community'
                    color={colors.primary}
                />
            </TouchableOpacity>}
        </View>
    )
}

const mapStateToProps = state => ({
    gotItAmountByGrade: state.gotItAmountByGrade
});

const mapDispatchToProps = (dispatch) => ({
    setGotItAmountByGrade: (obj) => dispatch(setGotItAmountByGrade(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(Grade)


const getStyle = (colors, font) => {
    return StyleSheet.create({
        wrapper: {
            flex: 1,
            marginTop: 10,
            marginBottom: 10
        },
        swipeText: {
            fontFamily: font.fontFamily,
            color: colors.primary,
            fontSize: font.regular,
            alignSelf: 'center'
        },
        percentage: {
            fontFamily: font.fontFamily,
            color: colors.text,
            fontSize: font.regular,
            alignSelf: 'center',
            fontWeight: 'bold'
        }
    })
}
