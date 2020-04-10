import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {getGrades} from "../../persistence/DbConnection";
import {KanjiGridScreen} from "./KanjiGridScreen";

const Stack = createStackNavigator();

export const LearnScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Learn" options={{title: 'Learn  学'}} component={GradesScreen}/>
            <Stack.Screen name="KanjiGrid" component={KanjiGridScreen}/>
        </Stack.Navigator>
    );
};

const GradesScreen = ({navigation}) => {
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
                <TouchableOpacity onPress={() => onGradePress(item)}>
                    <View style={style.container}>
                        <Text style={style.item}>{item.grade}</Text>
                    </View>
                </TouchableOpacity>
            }
            keyExtractor={item => item.id.toString()}
        />
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    item: {
        fontFamily: Platform.OS === 'ios' ? 'PingFangSC-Regular' : '',
        fontSize: 18,
    }
});

