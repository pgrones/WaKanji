import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingSelectionScreen from "../views/settings/SettingSelectionScreen";
import {AttributionScreen} from "../views/settings/AttributionScreen";
import {useTheme} from "@react-navigation/native";

const Stack = createStackNavigator();

export const SettingsScreen = () => {
    const {colors, font} = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerBackTitleVisible: true,
                headerStyle: {
                    backgroundColor: colors.backgroundLight,
                    shadowColor: 'transparent',
                    elevation: 0
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontFamily: font.fontFamily,
                    fontSize: font.regular,
                    fontWeight: 'bold'
                },
            }}
        >
            <Stack.Screen name="Settings" component={SettingSelectionScreen}/>
            <Stack.Screen name="Attributions" component={AttributionScreen}/>
        </Stack.Navigator>
    );
};


