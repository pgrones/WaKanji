import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SettingSelectionScreen from "../views/settings/SettingSelectionScreen";

const Stack = createStackNavigator();

export const SettingsScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={SettingSelectionScreen}/>
            <Stack.Screen name="Details" component={Details}/>
        </Stack.Navigator>
    );
};

const Details = ({route}) => {
    return (
        <View><Text>Details {route.params.count}</Text></View>
    )
};


