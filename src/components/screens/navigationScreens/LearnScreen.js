import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import KanjiGridScreen from "../views/learn/KanjiGridScreen";
import {GradesScreen} from "../views/learn/GradesScreen";
import KanjiInfoScreen from "../views/learn/KanjiInfoScreen";
import ExamplesScreen from "../views/learn/ExamplesScreen";
import {useTheme} from "@react-navigation/native";

const Stack = createStackNavigator();

export const LearnScreen = () => {
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
                }
            }}
        >
            <Stack.Screen name="Dictionary" component={GradesScreen}/>
            <Stack.Screen name="KanjiGrid" component={KanjiGridScreen}/>
            <Stack.Screen name="KanjiInfo" component={KanjiInfoScreen} options={{gestureEnabled: false}}/>
            <Stack.Screen name="Examples" component={ExamplesScreen}/>
        </Stack.Navigator>
    );
};
