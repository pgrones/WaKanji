import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {getGrades} from "../../persistence/DbConnection";
import {KanjiGridScreen} from "./KanjiGridScreen";
import {SuperScript} from "../helper/SuperScript";
import {connect} from "react-redux";

const Stack = createStackNavigator();

export const LearnScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Learn" options={{title: 'Learn  学'}} component={GradesScreen}/>
            <Stack.Screen name="KanjiGrid" component={KanjiGridScreen}/>
        </Stack.Navigator>
    );
};

const GradesScreen = ({navigation, props}) => {
    const [grades, setGrades] = useState([{id: 0, grade: ''}]);
    if (grades.length === 1) {
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

