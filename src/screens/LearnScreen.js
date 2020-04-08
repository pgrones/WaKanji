import React from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export const LearnScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Learn" options={{title: 'Learn  学'}} component={GradesScreen}/>
            <Stack.Screen name="Details" component={Details}/>
        </Stack.Navigator>
    );
};

const Details = ({route, navigation}) => {
    navigation.setOptions({title: route.params.header});

    return (
        <View><Text>Details {route.params.header}</Text></View>
    )
};

const GradesScreen = ({navigation}) => {
    return (
        <FlatList
            data={DATA}
            renderItem={(rowData) =>
                <TouchableOpacity onPress={() => navigation.push('Details', {header: rowData.item})}>
                    <View style={style.container}>
                        <Text style={style.item}>{rowData.item}</Text>
                    </View>
                </TouchableOpacity>
            }
            keyExtractor={item => item}
        />
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    item: {
        fontFamily: Platform.OS === 'ios' ? 'PingFangSC-Regular' : '',
        fontSize: 18,
    }
});

const DATA = [
    '1st Grade  小一',
    '2nd Grade  小二',
    '3rd Grade  小三',
    '4th Grade  小四',
    '5th Grade  小五',
    '6th Grade  小六',
    '7th Grade  中一',
    '8th Grade  中二',
    '9th Grade  中三',
    '10th Grade  高一',
    '11th Grade  高二',
    '12th Grade  高三'
];

