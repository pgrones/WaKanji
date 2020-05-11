import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import KanjiGridScreen from "../views/learn/KanjiGridScreen";
import GradesScreen from "../views/learn/GradesScreen";
import KanjiInfoScreen from "../views/learn/KanjiInfoScreen";
import ExamplesScreen from "../views/learn/ExamplesScreen";

const Stack = createStackNavigator();

export const LearnScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Learn" component={GradesScreen} options={{title: 'Dictionary'}}/>
            <Stack.Screen name="KanjiGrid" component={KanjiGridScreen}/>
            <Stack.Screen name="KanjiInfo" component={KanjiInfoScreen} options={{gestureEnabled: false}}/>
            <Stack.Screen name="Examples" component={ExamplesScreen}/>
        </Stack.Navigator>
    );
};
