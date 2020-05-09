import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingSelectionScreen from "../views/settings/SettingSelectionScreen";
import {AttributionScreen} from "../views/settings/AttributionScreen";

const Stack = createStackNavigator();

export const SettingsScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings  設定" component={SettingSelectionScreen}/>
            <Stack.Screen name="Attributions" component={AttributionScreen}/>
        </Stack.Navigator>
    );
};


