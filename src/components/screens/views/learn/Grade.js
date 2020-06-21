import React, {useEffect, useState} from "react";
import {SuperScript} from "../../../helper/SuperScript";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {connect} from "react-redux";
import {getGotItAmountByGradeId, getKanjiAmountByGradeId} from "../../../../persistence/DbConnection";
import {setGotItAmountByGrade} from "../../../../redux/actions/Actions";
import {ProgressArc} from "../../../helper/ProgressArc";

const Grade = ({grade, onPress, scrollUp, scrollDown, next, prev, gotItAmountByGrade, setGotItAmountByGrade}) => {
    const [amount, setAmount] = useState(0);
    const {colors, font} = useTheme();
    const style = getStyle(colors, font);

    useEffect(() => {
        getKanjiAmountByGradeId(grade.id, setAmount);
        getGotItAmountByGradeId(grade.id, (count) => setGotItAmountByGrade({id: grade.id, amount: count}));
    }, [])

    return (
        amount > 0 && gotItAmountByGrade[grade.id] >= 0 &&
        <View style={style.wrapper}>
            {/*{prev && <TouchableOpacity style={{alignSelf: "flex-end"}} onPress={() => scrollUp()}>*/}
            {/*    <Icon*/}
            {/*        name={'chevron-up'}*/}
            {/*        size={40}*/}
            {/*        type='material-community'*/}
            {/*        color={colors.primary}*/}
            {/*    />*/}
            {/*</TouchableOpacity>}*/}
            <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
                <SuperScript start={1} end={3} text={grade.grade}/>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
                <ProgressArc
                    percentage={gotItAmountByGrade[grade.id] / amount}
                    title={'Kanji Learned'}
                    value1={`${parseFloat((gotItAmountByGrade[grade.id] / amount * 100).toPrecision(4))}%`}
                    value2={`${gotItAmountByGrade[grade.id]} / ${amount}`}
                />
            </View>
            {/*<Button*/}
            {/*    title={<SuperScript start={1} end={3} text={grade.grade}/>}*/}
            {/*    iconSize={font.large}*/}
            {/*    icon={'chevron-right'}*/}
            {/*    type={'material-community'}*/}
            {/*    onPress={() => onPress(grade)}*/}
            {/*/>*/}
            <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: "center"}}
                              onPress={() => onPress(grade)}>
                <Text style={style.button}>Open {grade.grade.split(' ')[3]} Dictionary</Text>
            </TouchableOpacity>
            {/*{next && <TouchableOpacity style={{justifyContent: "flex-end"}} onPress={() => scrollDown()}>*/}
            {/*    <Icon*/}
            {/*        name={'chevron-down'}*/}
            {/*        size={40}*/}
            {/*        type='material-community'*/}
            {/*        color={colors.primary}*/}
            {/*    />*/}
            {/*</TouchableOpacity>}*/}
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
        button: {
            fontFamily: font.fontFamily,
            color: colors.primary,
            fontSize: font.medium,
            fontWeight: 'bold'
        }
    })
}
