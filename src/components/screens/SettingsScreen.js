import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export const SettingsScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={SelectionScreen}/>
            <Stack.Screen name="Details" component={Details}/>
        </Stack.Navigator>
    );
};

const Details = ({route}) => {
    return (
        <View><Text>Details {route.params.count}</Text></View>
    )
};

const SelectionScreen = ({navigation}) => {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.push('Details', {count: 1})}>
                <Text>Details</Text>
            </TouchableOpacity>
        </View>
    );
};
