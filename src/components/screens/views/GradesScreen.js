import React from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {getGrades} from "../../../persistence/DbConnection";
import {SuperScript} from "../../helper/SuperScript";
import {connect} from "react-redux";
import {setGrades} from "../../redux/actions/Actions";

const GradesScreen = ({navigation, grades, setGrades}) => {
    if (grades.length === 0) {
        getGrades(setGrades);
    }

    const onGradePress = (item) => {
        navigation.push('KanjiGrid', {header: item.grade, gradeId: item.id})
    };

    return (
        <FlatList
            data={grades}
            renderItem={({item}) =>
                <View style={style.wrapper}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => onGradePress(item)}>
                        <View style={style.container}>
                            <SuperScript start={item.grade.length === 13 ? 1 : 2} end={item.grade.length === 13 ? 3 : 4}
                                         text={item.grade}/>
                            <Text>ᐳ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }
            keyExtractor={item => item.id.toString()}
        />
    );
};

const mapStateToProps = state => ({
    grades: state.grades
});

const mapDispatchToProps = (dispatch) => ({
    setGrades: (grades) => dispatch(setGrades(grades))
});

export default connect(mapStateToProps, mapDispatchToProps)(GradesScreen);

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        paddingRight: 20,
    },
    wrapper: {
        marginLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    }
});

