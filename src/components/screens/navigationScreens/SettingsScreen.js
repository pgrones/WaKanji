import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingSelectionScreen from "../views/settings/SettingSelectionScreen";

const Stack = createStackNavigator();

export const SettingsScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={SettingSelectionScreen}/>
        </Stack.Navigator>
    );
};


